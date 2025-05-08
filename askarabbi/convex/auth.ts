import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { ConvexError } from "convex/values";
import { Id } from "./_generated/dataModel";
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
    if (args.existingAnonymousId) {
      const existingUser = await ctx.db.get(args.existingAnonymousId);
      if (existingUser && existingUser.isAnonymous) {
        // Found existing anonymous user, update last login and return it
        await ctx.db.patch(existingUser._id, { lastLoginAt: Date.now() });
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