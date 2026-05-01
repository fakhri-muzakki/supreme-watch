"use server";

import { snap } from "@/lib/midtrans";
import { createClient } from "@/lib/supabase/server";

export async function createCheckout(data: {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  items: {
    id: string;
    name: string;
    image_url: string;
    price: number;
    quantity: number;
  }[];
  total: number;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Error");
  }

  // 1. generate order_id untuk midtrans
  const midtransOrderId = `ORDER-${Date.now()}`;

  // 2. create transaction ke midtrans (INI YANG KEMARIN KURANG)
  const parameter = {
    transaction_details: {
      order_id: midtransOrderId,
      gross_amount: data.total,
    },
    customer_details: {
      first_name: data.customer_name,
      email: data.customer_email,
      // phone: data.customer_phone,
    },
  };

  const transaction = await snap.createTransaction(parameter);

  // 3. simpan order ke DB
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id, // nanti ambil dari auth
      status: "pending",
      total_amount: data.total,

      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone,
      shipping_address: data.shipping_address,

      midtrans_order_id: midtransOrderId,
      midtrans_token: transaction.token,
    })
    .select()
    .single();

  if (orderError) throw new Error(orderError.message);

  // 4. insert order_items
  const orderItems = data.items.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    product_name: item.name,
    product_image: item.image_url,
    price_snapshot: item.price,
    quantity: item.quantity,
    subtotal: item.price * item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw new Error(itemsError.message);

  return {
    token: transaction.token,
  };
}
