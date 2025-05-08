"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerification = internalAction({
  args: {
    email: v.string(),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: args.email,
      subject: "Verify your email for AskARabbi",
      html: `
        <h1>Welcome to AskARabbi!</h1>
        <p>Please click the link below to verify your email:</p>
        <a href="${process.env.APP_URL}/auth/verify-email?token=${args.token}">
          Verify Email
        </a>
      `,
    });
  },
}); 