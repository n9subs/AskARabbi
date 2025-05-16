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
    const logoUrl = `${process.env.APP_URL}/logo.png`; // Assuming logo.png is in public folder
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: args.email,
      subject: "אשר את האימייל לשאלת'רב",
      html: `
        <div style="text-align: center;">
          <img src="${logoUrl}" alt="שאלת&apos;רב Logo" style="width: 150px; margin-bottom: 20px;" />
        </div>
        <h1>ברוך הבא לשאלת'רב!</h1>
        <p>לחץ כאם לאימות המייל שלך:</p>
        <a href="${process.env.APP_URL}/auth/verify-email?token=${args.token}">
          לאימות
        </a>
      `,
    });
  },
}); 