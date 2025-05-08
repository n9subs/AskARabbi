import { NextRequest, NextResponse } from 'next/server';
import { queryAIAPI } from '@/utils/ai';
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel"; // Import Id if needed for casting

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

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

    // Validate input
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    // --- Rate Limiting Check --- 
    try {
      await convex.action(api.rateLimit.checkAndIncrement, { userId: userId as Id<"users"> });
    } catch (error: unknown) {
      let errorMessage = "שגיאת מכסת שימוש.";
      if (error instanceof Error) {
        console.warn("Rate limit hit for user:", userId, error.message);
        const rateLimitMessageMatch = error.message?.match(/ConvexError:\s*(.*?)\s*at context/);
        errorMessage = rateLimitMessageMatch ? rateLimitMessageMatch[1] : errorMessage;
      } else {
        console.warn("Rate limit check threw non-Error object:", error);
      }
      return NextResponse.json({ error: errorMessage }, { status: 429 });
    }
    // --- End Rate Limiting Check ---

    // Query Groq API with the question
    const aiAnswer = await queryAIAPI(question);

    // Add to user's history - pass the object directly
    await convex.mutation(api.history.add, {
      userId,
      question,
      answer: {
        tanakh: aiAnswer.tanakh,
        talmud: aiAnswer.talmud,
        web: aiAnswer.web,
        summary: aiAnswer.summary,
      },
    });

    // Return the answer as JSON
    return NextResponse.json({ answer: aiAnswer });
  } catch (error) {
    console.error('Error processing question:', error);
    const message = error instanceof Error ? error.message : 'אירעה שגיאה בעיבוד השאלה';
    const status = message.includes("Rate limit") ? 429 : 500; // Check if it was a rate limit error somehow missed
    return NextResponse.json({ error: message }, { status });
  }
} 