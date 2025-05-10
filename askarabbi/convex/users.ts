import { query, internalQuery, internalMutation, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Public query for general profile display
export const getUserProfile = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    if (!args.userId) return null;
    const user = await ctx.db.get(args.userId as Id<"users">);
    if (!user) return null;
    
    return {
      name: user.name,
      email: user.email,
      isAnonymous: user.isAnonymous,
      isEmailVerified: user.isEmailVerified, // Needed for limit calculation
      // Rate limiting info for display
      dailyQuestionCount: user.dailyQuestionCount ?? 0,
      lastQuestionDate: user.lastQuestionDate ?? 0,
      pendingQuestion: user.pendingQuestion,
      hasCompletedOnboarding: user.hasCompletedOnboarding,
    };
  },
});

// Internal query to get specific rate limit info (used by action)
export const getInternalUserRateInfo = internalQuery({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return null;
    return {
        _id: user._id,
        isAnonymous: user.isAnonymous,
        isEmailVerified: user.isEmailVerified,
        dailyQuestionCount: user.dailyQuestionCount ?? 0,
        lastQuestionDate: user.lastQuestionDate ?? 0,
    };
  },
});

// Internal mutation to increment count atomically
export const incrementQuestionCount = internalMutation({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        if (!user) return; // Should not happen if called after check

        const now = Date.now();
        const todayStart = new Date(now).setHours(0, 0, 0, 0);
        const lastDateStart = user.lastQuestionDate ? new Date(user.lastQuestionDate).setHours(0, 0, 0, 0) : 0;

        let currentCount = user.dailyQuestionCount ?? 0;
        if (lastDateStart !== todayStart) {
            currentCount = 0; // Reset count if it's a new day
        }

        await ctx.db.patch(args.userId, {
            dailyQuestionCount: currentCount + 1,
            lastQuestionDate: now, // Store timestamp of this question
        });
    },
});

// Set pending question for a user
export const setPendingQuestion = mutation({
    args: { 
        userId: v.id("users"),
        questionId: v.id("history"),
        questionText: v.string(),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        await ctx.db.patch(args.userId, {
            pendingQuestion: {
                questionId: args.questionId,
                questionText: args.questionText,
                timestamp: now,
            }
        });
        
        return { success: true };
    }
});

// Clear pending question for a user
export const clearPendingQuestion = mutation({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.userId, {
            pendingQuestion: undefined
        });
        
        return { success: true };
    }
});

// Check if user has a pending question
export const hasPendingQuestion = query({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        if (!user) return false;
        
        return !!user.pendingQuestion;
    }
}); 