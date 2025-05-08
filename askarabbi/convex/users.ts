import { query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const getUserProfile = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    if (!args.userId) {
      return null;
    }
    const user = await ctx.db.get(args.userId as Id<"users">);
    if (!user) {
      return null;
    }
    return {
      name: user.name,
      isAnonymous: user.isAnonymous,
      // We don't want to return everything, just what's needed for the profile display
    };
  },
}); 