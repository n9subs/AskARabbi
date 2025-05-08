import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const list = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("history")
      .filter((q) => q.eq(q.field("userId"), args.userId))
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