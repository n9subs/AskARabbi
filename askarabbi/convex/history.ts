import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { ConvexError } from "convex/values";

export const list = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    if (!args.userId) {
      return [];
    }
    return await ctx.db
      .query("history")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const getHistoryItem = query({
  args: { historyItemId: v.id("history") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.historyItemId);
  },
});

export const createWithEmptyAnswer = mutation({
  args: {
    userId: v.id("users"),
    question: v.string(),
  },
  handler: async (ctx, args) => {
    // Create a history item with a placeholder empty answer
    const historyId = await ctx.db.insert("history", {
      userId: args.userId,
      question: args.question,
      answer: {
        tanakh: "מחפש תשובה...", // Placeholder text
        talmud: undefined,
        web: undefined,
        summary: undefined,
      },
      timestamp: Date.now(),
    });

    return historyId;
  },
});

export const add = mutation({
  args: {
    userId: v.id("users"),
    question: v.string(),
    answer: v.object({
      tanakh: v.string(),
      talmud: v.optional(v.string()),
      web: v.optional(v.string()),
      summary: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    // Insert the question into history
    const historyId = await ctx.db.insert("history", {
      userId: args.userId,
      question: args.question,
      answer: args.answer,
      timestamp: Date.now(),
    });

    // Set the pending question in the user's profile
    await ctx.db.patch(args.userId, {
      pendingQuestion: {
        questionId: historyId,
        questionText: args.question,
        timestamp: Date.now(),
      }
    });

    return historyId;
  },
});

export const updateAnswer = mutation({
  args: {
    historyId: v.id("history"),
    answer: v.object({
      tanakh: v.string(),
      talmud: v.optional(v.string()),
      web: v.optional(v.string()),
      summary: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const historyItem = await ctx.db.get(args.historyId);
    
    if (!historyItem) {
      throw new ConvexError("History item not found.");
    }
    
    await ctx.db.patch(args.historyId, {
      answer: args.answer,
    });
    
    // Clear pending question from user profile
    const user = await ctx.db.get(historyItem.userId);
    if (user && user.pendingQuestion && user.pendingQuestion.questionId === args.historyId) {
      await ctx.db.patch(historyItem.userId, {
        pendingQuestion: undefined
      });
    }
    
    return { success: true, historyId: args.historyId };
  },
});

export const deleteItem = mutation({
  args: { historyItemId: v.id("history") },
  handler: async (ctx, args) => {
    const historyItem = await ctx.db.get(args.historyItemId);

    if (!historyItem) {
      throw new ConvexError("History item not found.");
    }
    
    // Check if this is a pending question and clear it if needed
    const user = await ctx.db.get(historyItem.userId);
    if (user && user.pendingQuestion && user.pendingQuestion.questionId === args.historyItemId) {
      await ctx.db.patch(historyItem.userId, {
        pendingQuestion: undefined
      });
    }

    await ctx.db.delete(args.historyItemId);
    
    return { success: true, deletedId: args.historyItemId };
  },
}); 