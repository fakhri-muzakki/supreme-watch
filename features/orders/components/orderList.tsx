"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import OrderDetailModal from "./orderDetailModal";
import { cancelOrder } from "../actions/cancelOrder";
import OrderEmpty from "./OrderEmpty";
import type { Order } from "../type";
import { createClient } from "@/lib/supabase/client";

export default function OrderList({
  orders: initialData,
}: {
  orders: Order[];
}) {
  const [orders, setOrders] = useState<Order[]>(initialData);

  const [selected, setSelected] = useState<Order | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleCancel = async (id: string) => {
    setLoadingId(id);
    await cancelOrder(id);
    setLoadingId(null);
    location.reload();
  };

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("orders")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        (payload) => {
          console.log(payload.new);
          if (payload.eventType === "INSERT") {
            setOrders((prev) => [...prev, payload.new as Order]);
          }

          if (payload.eventType === "UPDATE") {
            setOrders((prev) =>
              prev.map((o) =>
                o.id === payload.new.id ? (payload.new as Order) : o,
              ),
            );
          }

          if (payload.eventType === "DELETE") {
            setOrders((prev) => prev.filter((o) => o.id !== payload.old.id));
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
                  Rp. {order.total_amount}
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
