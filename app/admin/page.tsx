import getRevenue from "@/features/admin/services/admin.service";
import RevenueChart from "@/features/admin/components/RevenueChart";
// import { getRevenueByDays } from "@/features/admin/lib/dashboard";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminPage() {
  const supabase = await createClient();

  const [ordersRes, latestRes, lowStockRes, initialData] = await Promise.all([
    supabase.from("orders").select("*"),
    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase.from("products").select("id, name, stock").lte("stock", 5),
    getRevenue(),
  ]);

  const orders = ordersRes.data;
  const latestOrders = latestRes.data;
  const lowStock = lowStockRes.data;

  const revenue =
    orders?.reduce((acc, o) => acc + Number(o.total_amount), 0) || 0;

  const totalOrders = orders?.length || 0;

  const pendingOrders =
    orders?.filter((o) => o.status === "pending").length || 0;
  const lowStockCount = lowStock?.length || 0;

  return (
    <div className="p-6 space-y-8">
      {/* ================= KPI ================= */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card title="Revenue" value={`$${revenue}`} />
        <Card title="Orders" value={totalOrders} />
        <Card title="Pending Orders" value={pendingOrders} />
        <Card title="Low Stock" value={lowStockCount} />
      </div>

      <RevenueChart initialData={initialData} />

      {/* ================= LATEST ORDERS ================= */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Latest Orders</h2>

        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3">No</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Total</th>
              </tr>
            </thead>

            <tbody>
              {latestOrders?.map((order, i) => (
                <tr key={order.id} className="border-t">
                  <td className="p-3">{i + 1}</td>

                  <td className="p-3">{order.customer_name}</td>

                  <td className="p-3">
                    <span className="text-xs px-2 py-1 rounded-md border">
                      {order.status}
                    </span>
                  </td>

                  <td className="p-3">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(order.total_amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!latestOrders?.length && (
            <p className="p-4 text-sm text-muted-foreground">No orders yet</p>
          )}
        </div>

        {/* BUTTON / LINK */}
        <div className="flex justify-end">
          <Link href="/admin/orders" className="text-sm underline">
            View all orders
          </Link>
        </div>
      </div>

      {/* ================= LOW STOCK ================= */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Low Stock Warning</h2>

        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3">Product</th>
                <th className="text-left p-3">Stock</th>
              </tr>
            </thead>

            <tbody>
              {lowStock?.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">{p.name}</td>

                  <td className="p-3">
                    <span className="text-red-500 font-medium">{p.stock}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!lowStock?.length && (
            <p className="p-4 text-sm text-muted-foreground">
              All products have sufficient stock
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ================= SMALL CARD =================
function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="border rounded-2xl p-4 space-y-1">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
