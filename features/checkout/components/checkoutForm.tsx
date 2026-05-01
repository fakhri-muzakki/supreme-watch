"use client";

import { useCartStore } from "@/features/cart/store/useCart";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, CheckoutValues } from "../schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { createCheckout } from "../actions/create-checkout";

export default function CheckoutForm() {
  const items = useCartStore((s) => s.items);
  const removeAllCarts = useCartStore((s) => s.removeAll);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (values: CheckoutValues) => {
    const res = await createCheckout({
      customer_name: values.customer_name,
      customer_email: values.customer_email,
      customer_phone: values.customer_phone,
      shipping_address: values.shipping_address,
      items,
      total,
    });

    removeAllCarts();
    window.snap.pay(res.token, {
      onSuccess: () => (window.location.href = "/orders"),
      onPending: () => (window.location.href = "/orders"),
      onError: () => alert("Payment failed"),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-10 md:grid-cols-2"
    >
      {/* ================= LEFT (FORM) ================= */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Shipping Details</h2>

        {/* FULL NAME */}
        <div className="space-y-1">
          <Input placeholder="Full Name" {...register("customer_name")} />
          {errors.customer_name && (
            <p className="text-sm text-destructive">
              {errors.customer_name.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div className="space-y-1">
          <Input placeholder="Email" {...register("customer_email")} />
          {errors.customer_email && (
            <p className="text-sm text-destructive">
              {errors.customer_email.message}
            </p>
          )}
        </div>

        {/* PHONE */}
        <div className="space-y-1">
          <Input placeholder="Phone" {...register("customer_phone")} />
          {errors.customer_phone && (
            <p className="text-sm text-destructive">
              {errors.customer_phone.message}
            </p>
          )}
        </div>

        {/* ADDRESS */}
        <div className="space-y-1">
          <textarea
            placeholder="Shipping Address"
            {...register("shipping_address")}
            className="w-full rounded-xl border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.shipping_address && (
            <p className="text-sm text-destructive">
              {errors.shipping_address.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full rounded-xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Continue to Payment"}
        </Button>
      </div>

      {/* ================= RIGHT (SUMMARY) ================= */}
      <div className="h-fit space-y-6 rounded-3xl border p-6">
        <h2 className="text-xl font-semibold">Order Summary</h2>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <Image
                src={item.image_url}
                width={64}
                height={64}
                alt={item.name}
                className="h-16 w-16 rounded-xl object-cover"
              />

              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.quantity} ×{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(item.price)}
                </p>
              </div>

              <p className="text-sm font-medium">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between border-t pt-4 text-lg font-semibold">
          <span>Total</span>
          <span>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(total)}
          </span>
        </div>
      </div>
    </form>
  );
}
