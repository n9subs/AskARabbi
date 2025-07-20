# Google OAuth and Consent Management Platform (CMP) Setup Guide

## Overview
This guide covers the setup and configuration of Google OAuth authentication and Google's Consent Management Platform (CMP) for GDPR compliance.

## Prerequisites

1. Google Cloud Console account
2. Google AdSense account (for CMP)
3. Next.js application with Convex backend

## Google OAuth Setup

### 1. Google Cloud Console Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/google/callback` (development)
     - `https://yourdomain.com/api/auth/google/callback` (production)
   - Save the Client ID and Client Secret

### 2. Environment Variables

Create a `.env.local` file in your project root:

```env
# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google AdSense/Analytics (for CMP)
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-xxxxxxxxxx
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### 3. Convex Environment Variables

If using Convex for production, set the environment variables in Convex dashboard:
```bash
npx convex env set NEXT_PUBLIC_CONVEX_URL https://your-instance.convex.cloud
```

## Google CMP Setup

### 1. Implementation Details

The CMP implementation includes:
- **Consent Banner**: Shows for EU/UK/Swiss users
- **2-Option Configuration**: "Consent" and "Manage Options"
- **Consent Types**:
  - Ad Storage
  - Ad User Data
  - Ad Personalization
  - Analytics Storage

### 2. How It Works

1. **Detection**: The system detects if the user is in EU/UK/Switzerland based on timezone
2. **Display**: Shows consent banner on first visit
3. **Storage**: Saves consent preferences in localStorage and cookies
4. **Google Integration**: Updates Google's consent state based on user choices

### 3. Testing CMP

To test the CMP functionality:

1. **Simulate EU User**:
   - Open browser DevTools
   - Go to Sensors tab
   - Set location to a European city
   - Refresh the page

2. **Clear Consent**:
   - Open DevTools Console
   - Run: `localStorage.removeItem('userConsent')`
   - Clear cookies for the domain
   - Refresh the page

## OAuth Flow

### Sign In Flow:
1. User clicks "Sign in with Google"
2. Redirected to Google OAuth consent screen
3. After approval, redirected to `/api/auth/google/callback`
4. Backend verifies Google token
5. Creates/updates user in Convex database
6. Sets session and redirects to home page

### Sign Up Flow:
1. Similar to sign in, but from sign-up page
2. Creates new user if email doesn't exist
3. Links Google account if email already exists

## Security Considerations

1. **Token Verification**: Always verify Google tokens server-side
2. **HTTPS Only**: Use HTTPS in production
3. **CSRF Protection**: Implemented via state parameter
4. **Secure Cookies**: HttpOnly, Secure, SameSite attributes

## Troubleshooting

### Common Issues:

1. **"Invalid redirect URI"**
   - Ensure redirect URI in Google Console matches exactly
   - Include protocol (http/https)
   - No trailing slashes

2. **"Consent banner not showing"**
   - Check if user is in required region
   - Clear localStorage and cookies
   - Check browser console for errors

3. **"OAuth login fails"**
   - Verify environment variables are set
   - Check Google Cloud Console for API enablement
   - Review server logs for detailed errors

## Database Schema Changes

Added to users table:
```typescript
googleId: v.optional(v.string()),
authProvider: v.optional(v.union(v.literal("email"), v.literal("google"))),
profilePicture: v.optional(v.string()),
```

## File Structure

```
src/
├── app/
│   ├── api/auth/google/
│   │   ├── route.ts          # OAuth initiation
│   │   └── callback/
│   │       └── route.ts      # OAuth callback handler
│   ├── components/
│   │   ├── GoogleSignInButton.tsx
│   │   ├── ConsentBanner.tsx
│   │   └── GoogleScripts.tsx
│   └── providers/
│       └── AuthProvider.tsx  # Updated for OAuth
├── utils/
│   └── consent.ts           # Consent management utilities
└── convex/
    └── auth.ts             # OAuth mutations
```

## Compliance Notes

- The CMP implementation follows Google's requirements for EU consent
- Consent is required before loading any advertising or analytics scripts
- Users can change their consent preferences at any time
- Consent choices are persisted for future visits

## Next Steps

1. Test OAuth flow with different scenarios
2. Monitor consent rates in Google Analytics
3. Consider implementing a footer link for consent management
4. Add OAuth provider indicators in user profile