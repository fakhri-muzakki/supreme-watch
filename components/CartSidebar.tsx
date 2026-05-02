"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/store/useCart";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { redirect } from "next/navigation";
import EmptyCart from "./EmptyCart";

export default function CartSidebar() {
  const [open, setOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const increase = useCartStore((s) => s.increaseQty);
  const decrease = useCartStore((s) => s.decreaseQty);
  const remove = useCartStore((s) => s.removeItem);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handlClick = (): void => {
    setOpen(false);
    redirect("/checkout");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full border border-border p-2 transition hover:bg-muted relative"
      >
        <ShoppingCart className=" h-4 w-4" />
        {items.length > 0 && (
          <span
            className="
        absolute -right-2 -top-2
        flex h-5 min-w-5 items-center justify-center
        rounded-full bg-primary px-1
        text-[10px] font-bold text-primary-foreground
        leading-none
      "
          >
            {items.length}
          </span>
        )}
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed -right-5 md:-right-10 -top-4 z-50 flex h-screen w-full max-w-md
          flex-col border-l bg-background shadow-2xl
          transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <p className="text-sm text-muted-foreground">
              {items.length} item(s)
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-2 hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5 scrollbar-hide">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            items.map((item) => (
              <div key={item.id} className="rounded-2xl border p-4">
                <div className="flex gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-muted">
                    <Image
                      src={item.image_url}
                      width={80}
                      height={80}
                      alt={item.name}
                      className="h-auto w-20 object-contain rounded-2xl"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold leading-tight">
                        {item.name}
                      </h3>

                      <button
                        onClick={() => remove(item.id)}
                        className="rounded-md p-1 text-muted-foreground hover:bg-muted"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      RP. {item.price}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decrease(item.id)}
                          className="rounded-full border p-2 hover:bg-muted"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="w-6 text-center font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increase(item.id)}
                          className="rounded-full border p-2 hover:bg-muted"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <span className="font-semibold">
                        Rp. {item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="space-y-4 border-t px-6 py-5">
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total</span>
            <span>Rp. {total}</span>
          </div>

          <Button className="h-12 w-full rounded-full" onClick={handlClick}>
            Checkout
          </Button>
        </div>
      </aside>
    </>
  );
}
