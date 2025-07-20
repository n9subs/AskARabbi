import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { ConvexError } from "convex/values";
// import { Id } from "./_generated/dataModel"; // Removed unused import
import { internal } from "./_generated/api";

// Simple hash function that works in V8 isolate
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
}

// Generate a verification token
function generateToken(): string {
  // Using a more robust method for token generation if available, or ensure this is secure enough for the context
  // For this example, a simple random string should suffice for a basic verification token
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  for (let i = 0; i < 32; i++) { // 32 characters long token
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export const signUp = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.optional(v.string()),
    termsAcceptedAt: v.number(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingUser) {
      throw new ConvexError("משתמש עם אימייל זה כבר קיים.");
    }

    const passwordHash = simpleHash(args.password);
    const verificationToken = generateToken();

    await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      passwordHash,
      isAnonymous: false,
      isEmailVerified: false, 
      verificationToken,
      lastLoginAt: Date.now(), // Consider if this should be null until first verified login
      termsAcceptedAt: args.termsAcceptedAt,
      dailyQuestionCount: 0,
      lastQuestionDate: 0, // Initialize to 0, will be set on first question
    });

    await ctx.scheduler.runAfter(0, internal.email.sendVerification, {
      email: args.email,
      token: verificationToken,
    });
    // No userId returned, sign-up does not auto-login.
  },
});

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!user || user.isAnonymous) {
      throw new ConvexError("פרטי התחברות שגויים או שהמשתמש אינו קיים.");
    }

    const passwordHash = simpleHash(args.password);
    if (passwordHash !== user.passwordHash) {
      throw new ConvexError("פרטי התחברות שגויים.");
    }

    if (!user.isEmailVerified) {
      // Before throwing, check if a token still exists to re-send? For now, simple error.
      await ctx.scheduler.runAfter(0, internal.email.sendVerification, {
        email: user.email!,
        token: user.verificationToken!,
      });
      throw new ConvexError("יש לאמת את כתובת האימייל לפני ההתחברות. נשלח אליך מייל אימות חדש.");
    }

    // Clear verification token on successful login if it hasn't been cleared yet
    // Though verifyEmail should have cleared it.
    if (user.verificationToken) {
        await ctx.db.patch(user._id, { verificationToken: undefined, lastLoginAt: Date.now() });
    } else {
        await ctx.db.patch(user._id, { lastLoginAt: Date.now() });
    }

    return { userId: user._id };
  },
});

export const signInAnonymously = mutation({
  args: {
    existingAnonymousId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const termsAcceptedTimestamp = Date.now();
    if (args.existingAnonymousId) {
      const existingUser = await ctx.db.get(args.existingAnonymousId);
      if (existingUser && existingUser.isAnonymous) {
        await ctx.db.patch(existingUser._id, { 
          lastLoginAt: Date.now(),
          termsAcceptedAt: termsAcceptedTimestamp,
        });
        return { userId: existingUser._id, isNew: false };
      }
      // If ID provided but user not found or not anonymous, 
      // it might be an old/invalid ID. Proceed to create a new one.
    }

    // Create a new anonymous user
    const newUserId = await ctx.db.insert("users", {
      isAnonymous: true,
      isEmailVerified: false, 
      lastLoginAt: Date.now(),
      termsAcceptedAt: termsAcceptedTimestamp,
      dailyQuestionCount: 0,
      lastQuestionDate: 0, // Initialize to 0
    });
    return { userId: newUserId, isNew: true };
  },
});

export const verifyEmail = mutation({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("verificationToken"), args.token))
      .first();

    if (!user) {
      throw new ConvexError("קישור אימות לא תקין או שפג תוקפו.");
    }

    if (user.isEmailVerified) {
        // Optional: If already verified, perhaps just inform the user or log them in.
        // For now, just update last login time as a sign of activity.
        await ctx.db.patch(user._id, { lastLoginAt: Date.now(), verificationToken: undefined });
        return { userId: user._id, alreadyVerified: true };
    }

    await ctx.db.patch(user._id, {
      isEmailVerified: true,
      verificationToken: undefined, 
      lastLoginAt: Date.now(), // Update last login/activity time
    });

    return { userId: user._id, alreadyVerified: false };
  },
});

export const markOnboardingComplete = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      // Not logged in, or session expired. Can't mark onboarding for a non-user.
      // Depending on requirements, you might throw an error or just return silently.
      // For now, let's assume this is called by an authenticated user.
      // If it's critical to handle non-auth state, add error handling or specific return.
      console.warn("Attempted to mark onboarding complete for unauthenticated user.");
      return { success: false, error: "User not authenticated" };
    }

    // The `tokenIdentifier` includes the issuer, e.g. `https://<YOUR_DOMAIN>.clerk.accounts.dev|<USER_ID>`
    // Or if you are storing user by subject `identity.subject`
    // We need to find the user by a field that matches how you store users from Clerk
    // Assuming you store users by `identity.subject` in a field like `clerkId` or similar,
    // or by email if that's unique and verified.
    // For this example, let's assume you have an `email` field that is reliably the identifier
    // or that your user system identifies users uniquely through `identity.subject` as `userId` or similar.

    // Let's assume user is identified by `identity.subject` stored as the document ID `_id` or a specific indexed field.
    // If your user._id is NOT the clerk identity.subject, you'll need a query here.
    // e.g. const user = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), identity.subject)).unique();
    // For now, this example assumes identity.subject is NOT directly the user._id and we need to query by email
    // which is a common pattern if Clerk is just one of the auth providers.
    // A more robust way if using Clerk exclusively is to store `identity.subject` in an indexed `clerkId` field.

    if (!identity.email) {
        console.warn("User identity does not have an email to mark onboarding.");
        return { success: false, error: "User email not available in identity" };
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    if (!user) {
      console.warn(`User not found with email: ${identity.email} to mark onboarding complete.`);
      return { success: false, error: "User not found" };
    }

    await ctx.db.patch(user._id, { hasCompletedOnboarding: true });
    return { success: true };
  },
});

// Google OAuth sign in/up
export const signInWithGoogle = mutation({
  args: {
    googleId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    profilePicture: v.optional(v.string()),
    isSignUp: v.boolean(), // Indicates if this is from sign-up page
  },
  handler: async (ctx, args) => {
    // Check if user exists with this Google ID
    let user = await ctx.db
      .query("users")
      .withIndex("by_google_id", (q) => q.eq("googleId", args.googleId))
      .first();

    if (user) {
      // Existing Google user - update last login
      await ctx.db.patch(user._id, {
        lastLoginAt: Date.now(),
        profilePicture: args.profilePicture, // Update profile picture if changed
      });
      return { userId: user._id, isNewUser: false };
    }

    // Check if user exists with this email (might have signed up with email/password)
    const emailUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (emailUser) {
      if (emailUser.isAnonymous) {
        // Convert anonymous user to Google user
        await ctx.db.patch(emailUser._id, {
          googleId: args.googleId,
          email: args.email,
          name: args.name || emailUser.name,
          isAnonymous: false,
          isEmailVerified: true, // Google emails are pre-verified
          authProvider: "google",
          profilePicture: args.profilePicture,
          lastLoginAt: Date.now(),
        });
        return { userId: emailUser._id, isNewUser: false };
      } else if (!emailUser.googleId) {
        // User exists with email/password - link Google account
        await ctx.db.patch(emailUser._id, {
          googleId: args.googleId,
          authProvider: "google",
          isEmailVerified: true, // Mark as verified since Google verified it
          profilePicture: args.profilePicture,
          lastLoginAt: Date.now(),
        });
        return { userId: emailUser._id, isNewUser: false };
      } else {
        // This shouldn't happen - email exists with different Google ID
        throw new ConvexError("כתובת האימייל הזו כבר משויכת לחשבון Google אחר.");
      }
    }

    // Create new user
    const newUserId = await ctx.db.insert("users", {
      googleId: args.googleId,
      email: args.email,
      name: args.name,
      isAnonymous: false,
      isEmailVerified: true, // Google emails are pre-verified
      authProvider: "google",
      profilePicture: args.profilePicture,
      lastLoginAt: Date.now(),
      termsAcceptedAt: Date.now(),
      dailyQuestionCount: 0,
      lastQuestionDate: 0,
    });

    return { userId: newUserId, isNewUser: true };
  },
});

// Verify Google token (to be called from API route)
export const verifyGoogleToken = mutation({
  args: {
    idToken: v.string(),
  },
  handler: async (ctx, args) => {
    // This will be called from the API route after verifying the token
    // The actual verification happens in the API route using google-auth-library
    // This mutation just returns success to confirm the backend can be reached
    return { success: true };
  },
});