import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get('questionId');

    if (!questionId) {
      return NextResponse.json(
        { error: 'Question ID is required' },
        { status: 400 }
      );
    }

    // Get the history item
    const historyItem = await convex.query(api.history.getHistoryItem, { 
      historyItemId: questionId as Id<"history"> 
    });

    if (!historyItem) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    // Return the answer
    return NextResponse.json({ answer: historyItem.answer });
  } catch (error) {
    console.error('Error fetching answer:', error);
    const message = error instanceof Error ? error.message : 'שגיאה בעת אחזור התשובה';
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 