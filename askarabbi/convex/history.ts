import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";
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
    await ctx.db.insert("history", {
      userId: args.userId,
      question: args.question,
      answer: args.answer,
      timestamp: Date.now(),
    });
  },
});

export const deleteItem = mutation({
  args: { historyItemId: v.id("history") },
  handler: async (ctx, args) => {
    const historyItem = await ctx.db.get(args.historyItemId);

    if (!historyItem) {
      throw new ConvexError("History item not found.");
    }

    await ctx.db.delete(args.historyItemId);
    
    return { success: true, deletedId: args.historyItemId };
  },
}); 