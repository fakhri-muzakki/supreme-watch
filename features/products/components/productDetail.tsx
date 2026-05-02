"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/store/useCart";
import type { Product } from "@/types/product";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

type ProductData = Product & { categories: { name: string } };

export default function ProductDetail({
  product: productData,
}: {
  product: ProductData;
}) {
  const [product, setProduct] = useState<ProductData>(productData);
  const addToCart = useCartStore((s) => s.addToCart);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("products")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "products",
        },
        (payload) => {
          if (payload.eventType === "UPDATE") {
            setProduct((prev) => ({ ...prev, stock: payload.new.stock }));
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="grid gap-12 md:grid-cols-2 pt-8">
      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-3xl bg-muted max-w-125">
        <Image
          src={product.image_url}
          alt={product.name}
          width={500}
          height={500}
          className="h-full w-full object-cover"
        />
      </div>

      {/* INFO */}
      <div className="flex flex-col justify-center">
        {/* CATEGORY */}
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          {product.categories?.name}
        </p>

        {/* TITLE */}
        <h1 className="mt-3 text-4xl font-semibold">{product.name}</h1>

        {/* PRICE */}
        <p className="mt-4 text-2xl font-medium">${product.price}</p>

        {/* STOCK */}
        <p className="mt-2 text-sm text-muted-foreground">
          {product.stock > 0
            ? `${product.stock} items available`
            : "Out of stock"}
        </p>

        {/* DESCRIPTION */}
        <p className="mt-6 text-muted-foreground leading-relaxed">
          {product.description}
        </p>

        {/* ACTION */}
        <div className="mt-8 flex gap-2">
          <Button
            size="lg"
            className="rounded-xl"
            disabled={product.stock === 0}
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
              })
            }
          >
            Add to Cart
          </Button>

          <Link
            href="/products"
            className={
              "border border-border px-3 py-1 rounded-full font-medium hover:bg-muted transition"
            }
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
