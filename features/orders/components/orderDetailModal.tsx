"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import type { Order, OrderItem } from "../type";
import { Button } from "@/components/ui/button";

export default function OrderDetailModal({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  const handlePay = () => {
    window.snap.pay(order.midtrans_token, {
      onSuccess: () => {
        window.location.href = "/orders";
      },
      onPending: () => {
        window.location.href = "/orders";
      },
      onError: () => {
        alert("Payment failed");
      },
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogTitle className="text-xl font-semibold">
          Order Detail
        </DialogTitle>
        {/* <h2 className="text-xl font-semibold mb-4">Order Detail</h2> */}

        <div className="space-y-4">
          {order.order_items.map((item: OrderItem) => (
            <div key={item.id} className="flex gap-4 items-center">
              <Image
                src={item.product_image}
                width={64}
                height={64}
                alt=""
                className="rounded-lg object-cover"
              />

              <div className="flex-1">
                <p className="font-medium">{item.product_name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} × ${item.price_snapshot}
                </p>
              </div>

              <p className="font-medium">${item.subtotal}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-4 space-y-2 text-sm">
          <p>
            <strong>Name:</strong> {order.customer_name}
          </p>
          <p>
            <strong>Email:</strong> {order.customer_email}
          </p>
          <p>
            <strong>Phone:</strong> {order.customer_phone}
          </p>
          <p>
            <strong>Address:</strong> {order.shipping_address}
          </p>
        </div>
        <Button className="w-full" onClick={handlePay}>
          Pay
        </Button>
      </DialogContent>
    </Dialog>
  );
}
