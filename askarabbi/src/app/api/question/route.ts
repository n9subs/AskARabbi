import { NextRequest, NextResponse } from 'next/server';
import { queryAIAPI } from '@/utils/ai';
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

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
    return NextResponse.json(
      { error: 'אירעה שגיאה בעיבוד השאלה' },
      { status: 500 }
    );
  }
} 