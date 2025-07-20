import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../../../convex/_generated/api';

const client = new OAuth2Client(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
);

// Get Convex URL from environment or use default
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || 'https://your-instance.convex.cloud';
const convex = new ConvexHttpClient(convexUrl);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    
    if (!code) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/sign-in?error=no_code`
      );
    }

    // Decode state to get mode (signin/signup)
    let mode = 'signin';
    if (state) {
      try {
        const decodedState = JSON.parse(Buffer.from(state, 'base64').toString());
        mode = decodedState.mode || 'signin';
      } catch (e) {
        console.error('Failed to decode state:', e);
      }
    }

    // Exchange code for tokens
    const { tokens } = await client.getToken(code);
    
    if (!tokens.id_token) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/sign-in?error=no_id_token`
      );
    }

    // Verify the ID token
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    });
    
    const payload = ticket.getPayload();
    if (!payload) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/sign-in?error=invalid_token`
      );
    }

    // Extract user information
    const { sub: googleId, email, name, picture } = payload;
    
    if (!email) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/sign-in?error=no_email`
      );
    }

    // Call Convex mutation to sign in/up with Google
    const result = await convex.mutation(api.auth.signInWithGoogle, {
      googleId,
      email,
      name,
      profilePicture: picture,
      isSignUp: mode === 'signup',
    });

    // Create response with redirect
    const response = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/?google_auth=success`
    );

    // Set a cookie with the user ID (you might want to use a more secure session management)
    response.cookies.set('userId', result.userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Google OAuth error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/sign-in?error=oauth_failed`
    );
  }
}