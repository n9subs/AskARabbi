# AdSense Policy Compliance Implementation

This document explains the changes made to comply with Google AdSense policies regarding content-free pages.

## Problem

Google AdSense rejected the site with the error:
> זיהינו הפרות מדיניות - מודעות המוצגות על ידי Google במסכים ללא תוכן של בעל אתר
> (Policy violations detected - Google ads displayed on screens without owner content)

AdSense prohibits showing ads on:
- Pages with no content or low-value content
- Pages used primarily for navigation, alerts, or behavioral purposes
- Pages under construction

## Solution

Implemented conditional AdSense loading based on page context:

### 1. Created Policy Utility (`src/utils/adsensePolicy.ts`)
- Identifies pages that should not display ads
- Provides `shouldShowAds()` function for dynamic checking
- Handles loading states, empty states, and content-free pages

### 2. Modified GoogleScripts Component (`src/app/components/GoogleScripts.tsx`)
- Uses `usePathname()` to detect current page
- Conditionally loads AdSense script only on appropriate pages
- Maintains analytics loading on all pages (allowed by policies)

### 3. Updated Layout (`src/app/layout.tsx`)
- Added documentation comment explaining new behavior
- No changes needed since GoogleScripts auto-detects context

## Pages That Will NOT Show AdSense Ads

### Authentication Pages (Navigation/Behavior Purpose)
- `/auth/sign-in` - Login form
- `/auth/sign-up` - Registration form  
- `/auth/verify-email` - Email verification

### Error Pages (Minimal Content)
- `/error` - Server error page
- `/404` - Not found page
- `/not-found` - Not found page

### Legal/Policy Pages (Low-Value Content for Ads)
- `/terms` - Terms of service
- `/privacy` - Privacy policy

### API Routes (No User Content)
- `/api/*` - All API endpoints

### Dynamic States (Content-Free Moments)
- Pages during loading states (`isLoading: true`)
- Empty history page (`isEmpty: true`)
- Pages explicitly marked as no content (`hasContent: false`)

## Pages That WILL Show AdSense Ads

### Main Content Pages (Rich Content)
- `/` - Main page with Q&A functionality
- `/history` - Question history (when has content)
- `/qualified` - Rabbi qualification page
- `/qualified/test-*` - Rabbi test pages

## Benefits

1. **Policy Compliance**: Eliminates ads from content-free pages
2. **Better UX**: No ads on authentication/navigation flows
3. **Focused Monetization**: Ads only on valuable content pages
4. **Future-Proof**: Easy to add new excluded paths

## Testing

To verify implementation:
1. Navigate to `/auth/sign-in` - Should NOT load AdSense script
2. Navigate to `/` - Should load AdSense script  
3. Navigate to `/terms` - Should NOT load AdSense script
4. Check browser developer tools Network tab for AdSense requests

## Re-submission to AdSense

After deployment:
1. Wait 24-48 hours for changes to be crawled
2. Request re-review through Google AdSense dashboard
3. Provide this documentation if requested

The implementation ensures full compliance with Google AdSense content policies while maintaining revenue potential on appropriate pages.