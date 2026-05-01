import type { OrderItem } from "@/features/admin/orders/order";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getOrderDetail(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (*),
      payments (*)
    `,
    )
    .eq("id", id)
    .single();

  if (error || !data) return null;

  return data;
}

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getOrderDetail(params.id);

  if (!data) return notFound();

  const payment = data.payments?.[0];

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Order Detail</h1>
        <p className="text-sm text-muted-foreground">
          {data.midtrans_order_id}
        </p>
      </div>

      {/* ================= INFO ================= */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-2xl p-4 space-y-2">
          <h2 className="font-semibold">Customer</h2>
          <p>{data.customer_name}</p>
          <p className="text-sm text-muted-foreground">{data.customer_email}</p>
          <p className="text-sm text-muted-foreground">{data.customer_phone}</p>
        </div>

        <div className="border rounded-2xl p-4 space-y-2">
          <h2 className="font-semibold">Shipping</h2>
          <p className="text-sm">{data.shipping_address}</p>
        </div>
      </div>

      {/* ================= STATUS ================= */}
      <div className="border rounded-2xl p-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">Order Status</p>
          <p className="font-semibold capitalize">{data.status}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="font-semibold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(data.total_amount)}
          </p>
        </div>
      </div>

      {/* ================= ITEMS ================= */}
      <div className="border rounded-2xl p-4 space-y-4">
        <h2 className="font-semibold">Items</h2>

        {data.order_items.map((item: OrderItem) => (
          <div key={item.id} className="flex items-center gap-4 border-t pt-4">
            <Image
              src={item.product_image}
              width={64}
              height={64}
              alt={item.product_name}
              className="h-16 w-16 rounded-xl object-cover"
            />

            <div className="flex-1">
              <p className="font-medium">{item.product_name}</p>
              <p className="text-sm text-muted-foreground">
                {item.quantity} ×{" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(item.price_snapshot)}
              </p>
            </div>

            <p className="font-medium">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(item.subtotal)}
            </p>
          </div>
        ))}
      </div>

      {/* ================= PAYMENT ================= */}
      <div className="border rounded-2xl p-4 space-y-2">
        <h2 className="font-semibold">Payment</h2>

        {payment ? (
          <>
            <p className="text-sm">
              Method:{" "}
              <span className="font-medium">{payment.payment_method}</span>
            </p>

            <p className="text-sm">
              Status:{" "}
              <span className="font-medium capitalize">{payment.status}</span>
            </p>

            {payment.paid_at && (
              <p className="text-sm text-muted-foreground">
                Paid at: {new Date(payment.paid_at).toLocaleString()}
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground">No payment data yet</p>
        )}
      </div>
    </div>
  );
}
