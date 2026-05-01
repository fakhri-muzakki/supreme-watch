import OrdersTable from "@/features/admin/orders/components/OrdersTable";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard - Orders" };

export default function AdminOrdersPage() {
  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Orders</h1>
      </div>
      <OrdersTable />
    </div>
  );
}
