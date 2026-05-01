import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { mapOrderStatus, mapPaymentStatus } from "@/features/checkout/helper";
import type { MidtransBody } from "@/features/checkout/checkout";
import sendTestEmail from "@/features/midtrans/services/sendTestEmail";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  try {
    // ================================
    // 1. SAFE PARSE BODY
    // ================================
    let body: MidtransBody;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const orderId = body.order_id;

    if (!orderId) {
      return NextResponse.json({ error: "order_id missing" }, { status: 400 });
    }

    // ================================
    // 2. MAP STATUS
    // ================================
    const paymentStatus = mapPaymentStatus(
      body.transaction_status,
      body.fraud_status,
    );

    const orderStatus = mapOrderStatus(paymentStatus);

    // ================================
    // 3. GET ORDER FROM DB
    // ================================
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("midtrans_order_id", orderId)
      .maybeSingle();

    if (orderError) {
      console.error("Order fetch error:", orderError);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    // ================================
    // ⚠️ IMPORTANT: HANDLE TEST WEBHOOK
    // ================================
    if (!order) {
      console.warn("Order not found (likely test webhook):", orderId);

      return NextResponse.json({ ok: true });
    }

    // ================================
    // 4. IDEMPOTENCY CHECK
    // ================================
    if (order.status === "paid") {
      console.log("Order already paid, skipping:", orderId);
      return NextResponse.json({ ok: true });
    }

    // ================================
    // 5. UPSERT PAYMENT
    // ================================
    const { error: paymentError } = await supabase.from("payments").upsert(
      {
        order_id: order.id,
        status: paymentStatus,
        midtrans_transaction_id: body.transaction_id,
        payment_method: body.payment_type,
        payment_type: body.payment_type,
        paid_amount: Number(body.gross_amount),
        paid_at: paymentStatus === "success" ? new Date().toISOString() : null,
        midtrans_response: body,
      },
      {
        onConflict: "midtrans_transaction_id",
      },
    );

    if (paymentError) {
      console.error("Payment error:", paymentError);
      return NextResponse.json(
        { error: "Payment update failed" },
        { status: 500 },
      );
    }

    // ================================
    // 6. UPDATE ORDER STATUS
    // ================================
    const { error: updateOrderError } = await supabase
      .from("orders")
      .update({ status: orderStatus })
      .eq("id", order.id);

    if (updateOrderError) {
      console.error("Order update error:", updateOrderError);
      return NextResponse.json(
        { error: "Order update failed" },
        { status: 500 },
      );
    }

    // ================================
    // 7. REDUCE STOCK (ONLY SUCCESS)
    // ================================
    if (paymentStatus === "success") {
      const { data: items, error: itemsError } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", order.id);

      if (itemsError) {
        console.error("Order items error:", itemsError);
        return NextResponse.json(
          { error: "Items fetch failed" },
          { status: 500 },
        );
      }

      for (const item of items || []) {
        if (!item.product_id) continue;

        const { error: stockError } = await supabase.rpc("decrease_stock", {
          product_id_input: item.product_id,
          qty: item.quantity,
        });

        if (stockError) {
          console.error("Stock error:", stockError);
          return NextResponse.json(
            { error: "Stock update failed" },
            { status: 500 },
          );
        }
      }
    }

    // ================================
    // 8. Send email
    // ================================
    await sendTestEmail();

    // ================================
    // DONE
    // ================================
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Webhook error:", error);

      return NextResponse.json(
        {
          message: error?.message,
        },
        { status: 500 },
      );
    }
  }
}
