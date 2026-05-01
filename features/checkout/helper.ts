import type { SupabaseClient } from "@supabase/supabase-js";

export function mapPaymentStatus(
  transactionStatus: string,
  fraudStatus: string,
) {
  if (transactionStatus === "capture") {
    if (fraudStatus === "challenge") return "pending";
    if (fraudStatus === "accept") return "success";
  }

  if (transactionStatus === "settlement") return "success";
  if (transactionStatus === "pending") return "pending";
  if (transactionStatus === "deny") return "failed";
  if (transactionStatus === "expire") return "expired";
  if (transactionStatus === "cancel") return "failed";

  return "pending";
}

export function mapOrderStatus(paymentStatus: string) {
  switch (paymentStatus) {
    case "success":
      return "paid";
    case "pending":
      return "pending";
    case "failed":
    case "expired":
      return "cancelled";
    default:
      return "pending";
  }
}

export async function getOrderDbId(
  supabase: SupabaseClient,
  midtransOrderId: string,
) {
  const { data } = await supabase
    .from("orders")
    .select("id")
    .eq("midtrans_order_id", midtransOrderId)
    .single();

  return data?.id;
}
