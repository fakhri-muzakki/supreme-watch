"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import Watch1Image from "@/assets/images/watch-1.png";
import Watch2Image from "@/assets/images/watch-2.png";
import Watch3Image from "@/assets/images/watch-3.png";

const initialCart = [
  {
    id: 1,
    title: "Supreme Chronograph",
    price: 299,
    quantity: 1,
    image: Watch1Image,
  },
  {
    id: 2,
    title: "Midnight Steel",
    price: 349,
    quantity: 2,
    image: Watch2Image,
  },
  {
    id: 3,
    title: "Royal Silver",
    price: 259,
    quantity: 1,
    image: Watch3Image,
  },
];

export default function CartSidebar() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(initialCart);

  const increase = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrease = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

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
        {/* Cart ({items.length}) */}
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
            <div className="pt-20 text-center text-muted-foreground">
              Cart is empty
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="rounded-2xl border p-4">
                <div className="flex gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-muted">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="h-auto w-20 object-contain"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold leading-tight">
                        {item.title}
                      </h3>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="rounded-md p-1 text-muted-foreground hover:bg-muted"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      ${item.price}
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
                        ${item.price * item.quantity}
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
            <span>${total}</span>
          </div>

          <Button className="h-12 w-full rounded-full">Checkout</Button>
        </div>
      </aside>
    </>
  );
}
