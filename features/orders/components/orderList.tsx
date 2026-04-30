"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import OrderDetailModal from "./orderDetailModal";
import { cancelOrder } from "../actions/cancelOrder";
import OrderEmpty from "./OrderEmpty";

export default function OrderList({ orders }: { orders: any[] }) {
  const [selected, setSelected] = useState<any | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleCancel = async (id: string) => {
    setLoadingId(id);
    await cancelOrder(id);
    setLoadingId(null);
    location.reload(); // simple refresh (nanti bisa optimize)
  };

  return (
    <>
      <div className="space-y-6">
        {orders.length ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            >
              {/* LEFT */}
              <div>
                <p className="text-sm text-muted-foreground">
                  Order ID: {order.id.slice(0, 8)}
                </p>

                <p className="mt-1 text-lg font-medium">
                  ${order.total_amount}
                </p>

                <p className="text-sm text-muted-foreground capitalize">
                  {order.status}
                </p>
              </div>

              {/* ACTION */}
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelected(order)}>
                  Detail
                </Button>

                {order.status === "pending" && (
                  <Button
                    variant="destructive"
                    disabled={loadingId === order.id}
                    onClick={() => handleCancel(order.id)}
                  >
                    {loadingId === order.id ? "Cancelling..." : "Cancel"}
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <OrderEmpty />
        )}
      </div>

      {/* MODAL */}
      {selected && (
        <OrderDetailModal order={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
