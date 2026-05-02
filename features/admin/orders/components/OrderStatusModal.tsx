"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { updateOrderStatus } from "../order.service";
import type { Order } from "../order";

const statuses = [
  "pending",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

interface OrderStatusModalProps {
  open: boolean;
  onClose: () => void;
  order: Order;

  refetch: () => void;
}

export default function OrderStatusModal({
  open,
  onClose,
  order,
  refetch,
}: OrderStatusModalProps) {
  const [value, setValue] = useState(order?.status || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await updateOrderStatus(order.id, value);
      refetch();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="space-y-4">
        <DialogTitle>Update Status</DialogTitle>

        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border rounded-xl p-2"
        >
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <Button onClick={handleUpdate} disabled={loading}>
          Update
        </Button>
      </DialogContent>
    </Dialog>
  );
}
