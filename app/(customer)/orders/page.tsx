import { createClient } from "@/lib/supabase/server";
import OrderList from "@/features/orders/components/orderList";
import { redirect } from "next/navigation";
import Script from "next/script";

export default async function OrdersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (*)
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return <p>Error loading orders</p>;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-28">
      <div className="mb-12 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Supreme Watch
        </p>
        <h1 className="mt-2 text-4xl font-semibold">My Orders</h1>
      </div>

      <OrderList orders={orders ?? []} />
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="afterInteractive"
      />
    </main>
  );
}
