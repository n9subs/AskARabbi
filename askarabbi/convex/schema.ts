import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    isAnonymous: v.boolean(),
    isEmailVerified: v.boolean(),
    passwordHash: v.optional(v.string()),
    verificationToken: v.optional(v.string()),
    lastLoginAt: v.number(),
    dailyQuestionCount: v.optional(v.number()),
    lastQuestionDate: v.optional(v.number()),
    termsAcceptedAt: v.optional(v.number()),
    pendingQuestion: v.optional(v.object({
      questionId: v.id("history"),
      questionText: v.string(),
      timestamp: v.number(),
    })),
    hasCompletedOnboarding: v.optional(v.boolean()),
  }),
  history: defineTable({
    userId: v.id("users"),
    question: v.string(),
    answer: v.object({
      tanakh: v.string(),
      talmud: v.optional(v.string()),
      web: v.optional(v.string()),
      summary: v.optional(v.string()),
    }),
    timestamp: v.number(),
  }).index("by_user", ["userId"]),
}); 