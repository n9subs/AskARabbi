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
    hash = hash & hash;
  }
  return hash.toString(36);
}

// Generate a verification token
function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export const signUp = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.optional(v.string()),
  },
  async handler(ctx, args) {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingUser) {
      throw new ConvexError("User already exists");
    }

    const passwordHash = simpleHash(args.password);
    const verificationToken = generateToken();

    // Create user
    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      passwordHash,
      isAnonymous: false,
      isEmailVerified: false,
      verificationToken,
      lastLoginAt: Date.now(),
    });

    // Send verification email using internal action
    await ctx.scheduler.runAfter(0, internal.email.sendVerification, {
      email: args.email,
      token: verificationToken,
    });

    return { userId };
  },
});

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!user) {
      throw new ConvexError("Invalid credentials");
    }

    const passwordHash = simpleHash(args.password);
    if (passwordHash !== user.passwordHash) {
      throw new ConvexError("Invalid credentials");
    }

    await ctx.db.patch(user._id, { lastLoginAt: Date.now() });

    return { userId: user._id };
  },
});

export const signInAnonymously = mutation({
  args: {},
  async handler(ctx) {
    const userId = await ctx.db.insert("users", {
      isAnonymous: true,
      isEmailVerified: false,
      lastLoginAt: Date.now(),
    });

    return { userId };
  },
});

export const verifyEmail = mutation({
  args: {
    token: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("verificationToken"), args.token))
      .first();

    if (!user) {
      throw new ConvexError("Invalid verification token");
    }

    await ctx.db.patch(user._id, {
      isEmailVerified: true,
      verificationToken: undefined,
    });

    return { userId: user._id };
  },
}); 