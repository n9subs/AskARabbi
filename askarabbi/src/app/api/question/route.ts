import { NextRequest, NextResponse } from 'next/server';
import { queryGroqAPI } from '@/utils/groq';

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    // Validate input
    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'A valid question is required' },
        { status: 400 }
      );
    }

    // Query Groq API with the question (options are handled internally now)
    const answer = await queryGroqAPI(question);

    // Return the answer as JSON
    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Error processing question:', error);
    return NextResponse.json(
      { error: 'Failed to process question' },
      { status: 500 }
    );
  }
} 