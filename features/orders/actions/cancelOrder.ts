"use server";

import { createClient } from "@/lib/supabase/server";

export async function cancelOrder(orderId: string) {
  const supabase = await createClient();

  await supabase
    .from("orders")
    .update({ status: "cancelled" })
    .eq("id", orderId)
    .eq("status", "pending");
}
