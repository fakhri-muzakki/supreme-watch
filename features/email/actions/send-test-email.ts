"use server";

import { resend } from "@/lib/resend";

export async function sendTestEmail() {
  const data = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: ["fakhrimuzakki06@gmail.com"],
    subject: "Test Email",
    html: "<h1>Hello from Mini Store</h1>",
  });

  return data;
}
