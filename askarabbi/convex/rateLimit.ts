import { action } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { ConvexError } from "convex/values";
import { Id } from "./_generated/dataModel"; // Import Id for typing
import { ActionCtx } from "./_generated/server"; // Import ActionCtx for typing context

// Define limits
const ANON_LIMIT = 5;
const VERIFIED_LIMIT = 25;

// Define expected return type for the internal query for clarity
type UserRateInfo = {
    _id: Id<"users">;
    isAnonymous: boolean;
    isEmailVerified: boolean;
    dailyQuestionCount: number;
    lastQuestionDate: number;
} | null;

// Define expected return type for the action
type ActionResult = { 
    success: boolean; 
    remaining: number; 
};

export const checkAndIncrement = action({
  args: { userId: v.id("users") },
  handler: async (ctx: ActionCtx, args: { userId: Id<"users"> }): Promise<ActionResult> => {
    // Get user rate limit info using internal query
    const userInfo: UserRateInfo = await ctx.runQuery(internal.users.getInternalUserRateInfo, { userId: args.userId });

    if (!userInfo) {
      throw new ConvexError("User not found for rate limiting.");
    }

    // Determine user's limit
    const limit: number = userInfo.isAnonymous ? ANON_LIMIT : (userInfo.isEmailVerified ? VERIFIED_LIMIT : ANON_LIMIT);

    // Check if the count needs reset (new day)
    const now = Date.now();
    const todayStart = new Date(now).setHours(0, 0, 0, 0); // Start of today in UTC
    const lastDateStart = userInfo.lastQuestionDate ? new Date(userInfo.lastQuestionDate).setHours(0, 0, 0, 0) : 0;

    let currentCount: number = userInfo.dailyQuestionCount;
    if (lastDateStart !== todayStart) {
        currentCount = 0; // Reset count if last question was not today
    }

    // Check limit
    if (currentCount >= limit) {
      throw new ConvexError(`חרגת ממכסת השאלות היומית (${limit}). נסה שוב מחר.`); // Exceeded daily quota message
    }

    // If limit not exceeded, increment the count via internal mutation
    await ctx.runMutation(internal.users.incrementQuestionCount, { userId: args.userId });

    // Return success or potentially the remaining count?
    return { success: true, remaining: limit - (currentCount + 1) };
  },
}); 