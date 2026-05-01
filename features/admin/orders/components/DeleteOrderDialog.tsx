"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { deleteOrder } from "../order.service";
import type { Order } from "../order";

interface DeleteOrderDialogProps {
  open: boolean;
  onClose: () => void;
  order: Order;

  refetch: () => void;
}

export default function DeleteOrderDialog({
  open,
  onClose,
  order,
  refetch,
}: DeleteOrderDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteOrder(order.id);
      refetch();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal delete order");
    } finally {
      setLoading(false);
    }
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>Delete Order</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete order{" "}
          <span className="font-medium">{order.midtrans_order_id}</span>?
        </p>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
