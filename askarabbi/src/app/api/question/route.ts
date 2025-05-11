import { NextRequest, NextResponse } from 'next/server';
import { queryAIAPI } from '@/utils/ai';
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel"; // Import Id if needed for casting
import { PostHog } from 'posthog-node'; // Added PostHog import

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Initialize PostHog Client
// Ensure POSTHOG_API_KEY and POSTHOG_HOST are set in your environment variables
let posthog: PostHog | undefined;
if (process.env.POSTHOG_API_KEY && process.env.POSTHOG_HOST) {
  posthog = new PostHog(process.env.POSTHOG_API_KEY, {
    host: process.env.POSTHOG_HOST,
    flushAt: 1, // Send events immediately for serverless environments
    flushInterval: 0 // Disable interval flushing
  });
} else {
  console.warn('PostHog API Key or Host not configured. Server-side event tracking will be disabled.');
}

const MIN_QUESTION_LENGTH = 10;
const MAX_QUESTION_LENGTH = 10000; // Example max length

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, userId } = body;

    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: "יש להתחבר כדי לשאול שאלות" },
        { status: 401 }
      );
    }

    const trimmedQuestion = question ? String(question).trim() : "";

    if (trimmedQuestion.length < MIN_QUESTION_LENGTH) {
      return NextResponse.json(
        { error: `השאלה חייבת להכיל לפחות ${MIN_QUESTION_LENGTH} תווים.` },
        { status: 400 }
      );
    }
    if (trimmedQuestion.length > MAX_QUESTION_LENGTH) {
      return NextResponse.json(
        { error: `השאלה ארוכה מדי (מקסימום ${MAX_QUESTION_LENGTH} תווים).` },
        { status: 400 }
      );
    }

    // Check if the user has a pending question
    const userProfile = await convex.query(api.users.getUserProfile, { userId: userId as Id<"users"> });
    if (userProfile?.pendingQuestion) {
      return NextResponse.json(
        { error: "יש לך שאלה ממתינה. אנא המתן לתשובה לפני שליחת שאלה חדשה." },
        { status: 409 } // Conflict status code
      );
    }

    // --- Rate Limiting Check --- 
    try {
      await convex.action(api.rateLimit.checkAndIncrement, { userId: userId as Id<"users"> });
    } catch (error: unknown) {
      let errorMessage = "שגיאת מכסת שימוש.";
      if (error instanceof Error) {
        // console.warn("Rate limit hit for user:", userId, error.message);
        const rateLimitMessageMatch = error.message?.match(/ConvexError:\s*(.*?)\s*at context/);
        errorMessage = rateLimitMessageMatch ? rateLimitMessageMatch[1] : errorMessage;
      } else {
        // console.warn("Rate limit check threw non-Error object:", error);
      }
      return NextResponse.json({ error: errorMessage }, { status: 429 });
    }
    // --- End Rate Limiting Check ---

    // First, create a history entry with empty answer
    const historyId = await convex.mutation(api.history.createWithEmptyAnswer, {
      userId: userId as Id<"users">,
      question: trimmedQuestion,
    });

    // Set pending question immediately
    await convex.mutation(api.users.setPendingQuestion, {
      userId: userId as Id<"users">,
      questionId: historyId,
      questionText: trimmedQuestion,
    });

    // Then asynchronously query the AI API
    queryAIAPI(trimmedQuestion)
      .then(async (aiAnswer) => {
        // Update the history item with the actual answer
        await convex.mutation(api.history.updateAnswer, {
          historyId,
          answer: {
            tanakh: aiAnswer.tanakh,
            talmud: aiAnswer.talmud,
            web: aiAnswer.web,
            summary: aiAnswer.summary,
          },
        });

        // PostHog event for successful answer
        if (posthog) {
          posthog.capture({
            distinctId: userId as string, // Ensure distinctId is a string
            event: 'AI Answer Successful',
            properties: {
              questionId: historyId.toString(), // Convert Id to string if necessary
              questionText: trimmedQuestion,
              // Add any other relevant properties
            }
          });
          await posthog.shutdown(); // Ensure events are flushed
        }

      })
      .catch(async (error) => {
        console.error('Error processing AI answer or AI timed out:', error);
        let errorType: "failed" | "timed_out" = "failed";
        let clientErrorMessage = "אירעה שגיאה בעיבוד התשובה.";
        const originalErrorMessage = error instanceof Error ? error.message : String(error);

        if (error instanceof Error && error.message === "AI_TIMEOUT") {
          errorType = "timed_out";
          clientErrorMessage = "הפעולה לקחה יותר מדי זמן והופסקה.";
          console.warn(`AI Query for questionId ${historyId} timed out.`);
        } else {
          console.error(`AI Query for questionId ${historyId} failed:`, originalErrorMessage);
        }

        // PostHog event for failed answer
        if (posthog) {
          posthog.capture({
            distinctId: userId as string,
            event: 'AI Answer Failed',
            properties: {
              questionId: historyId.toString(),
              questionText: trimmedQuestion,
              errorType: errorType,
              errorMessage: originalErrorMessage, // Log the original error message
              // Add any other relevant properties
            }
          });
          await posthog.shutdown(); // Ensure events are flushed
        }

        // Call the new Convex mutation to handle the error, refund credit, and set status
        try {
          await convex.mutation(api.history.handleQuestionError, {
            historyId: historyId,
            userId: userId as Id<"users">,
            errorType: errorType,
            errorMessage: clientErrorMessage // Pass a user-facing message
          });
        } catch (convexError) {
          console.error("Failed to call handleQuestionError mutation:", convexError);
          // If this fails, the user might not get their credit back, and pending status might remain.
          // This is a secondary error, the primary AI error is already logged.
        }
      });

    // Return success immediately with pending status
    return NextResponse.json({ 
      status: "pending",
      message: "השאלה התקבלה ומעובדת. התשובה תופיע בקרוב.",
      historyId: historyId
    });
  } catch (error: unknown) { // Catch as any to access message
    console.error('Error processing question:', error);
    const message = error instanceof Error ? error.message : 'אירעה שגיאה בעיבוד השאלה';
    const status = message.includes("Rate limit") ? 429 : (
      typeof error === 'object' && error !== null && 'status' in error && 
      (error.status === 401 || error.status === 400 || error.status === 409) ? 
      (error as {status: number}).status : 500
    );
    return NextResponse.json({ error: message }, { status });
  }
} 