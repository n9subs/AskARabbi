import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Clear the pending question
    await convex.mutation(api.users.clearPendingQuestion, { 
      userId: userId as Id<"users"> 
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error clearing pending question:', error);
    const message = error instanceof Error ? error.message : 'שגיאה בעת ניקוי שאלה ממתינה';
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 