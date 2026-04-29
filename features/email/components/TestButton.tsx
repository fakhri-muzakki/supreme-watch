"use client";

import { Button } from "@/components/ui/button";
import { sendTestEmail } from "@/features/email/actions/send-test-email";

export default function TestButton() {
  async function handleSend() {
    const result = await sendTestEmail();
    console.log(result);
  }

  return <Button onClick={handleSend}>Send Test Email</Button>;
}
