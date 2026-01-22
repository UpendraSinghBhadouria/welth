"use server";

import { Resend } from "resend";

interface SendEmailParams {
  to: string;
  subject: string;
  react: React.ReactNode;
}
export async function sendEmail({ to, subject, react }: SendEmailParams) {
  const resend = new Resend(process.env.RESEND_API_KEY || "");

  try {
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL as string,
      to,
      subject,
      react,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
