import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { ConvexError } from "convex/values";
import { internal } from "./_generated/api"; // Import internal for calling users mutation

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
      status: "pending", // Initialize status
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
      status: "answered", // Set status to answered
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

export const handleQuestionError = mutation({
  args: {
    historyId: v.id("history"),
    userId: v.id("users"), // Need userId to clear pendingQuestion and refund
    errorType: v.union(v.literal("timed_out"), v.literal("failed")),
    errorMessage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const historyItem = await ctx.db.get(args.historyId);
    if (!historyItem) {
      // If history item doesn't exist, maybe it was already cleaned up.
      // Still try to clear pending question for the user if it matches this attempt.
      const userForClear = await ctx.db.get(args.userId);
      if (userForClear && userForClear.pendingQuestion && userForClear.pendingQuestion.questionId === args.historyId) {
        await ctx.db.patch(args.userId, { pendingQuestion: undefined });
      }
      // No history item to update, and we can't refund if we don't know if a question was actually submitted.
      // Log a warning or handle as appropriate.
      console.warn(`History item ${args.historyId} not found during handleQuestionError.`);
      return { success: false, error: "History item not found" };
    }

    // Update history item status and set an error message in the answer
    const errorAnswer = {
      tanakh: "",
      talmud: "",
      web: "",
      summary: args.errorMessage || (args.errorType === "timed_out" ? "השאלה לקחה יותר מדי זמן לעיבוד." : "אירעה שגיאה בעיבוד השאלה."),
    };

    await ctx.db.patch(args.historyId, {
      status: args.errorType,
      answer: errorAnswer,
    });

    // Refund the question credit by calling the internal mutation
    await ctx.scheduler.runAfter(0, internal.users.decrementQuestionCount, { userId: args.userId });

    // Clear pending question from user profile
    // (Check if the pending question is indeed the one that failed/timed out)
    const user = await ctx.db.get(args.userId);
    if (user && user.pendingQuestion && user.pendingQuestion.questionId === args.historyId) {
      await ctx.db.patch(args.userId, {
        pendingQuestion: undefined,
      });
    }

    return { success: true, historyId: args.historyId, status: args.errorType };
  },
}); 