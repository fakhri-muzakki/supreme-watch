"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/store/useCart";

type Product = {
  id: string;
  name: string;
  price: number;
  image_url: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addToCart);

  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl border bg-card
        transition-all duration-500 hover:-translate-y-1 hover:shadow-xl
      "
    >
      {/* IMAGE */}
      <div className="relative h-80 w-full overflow-hidden bg-muted">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="space-y-3 p-5">
        <h3 className="text-lg font-semibold leading-tight">{product.name}</h3>

        <div className="flex items-center justify-between">
          <span className="text-base font-medium text-muted-foreground">
            ${product.price}
          </span>

          <Button
            size="sm"
            className="rounded-full px-4 opacity-0 transition-all duration-300 group-hover:opacity-100"
            onClick={() => addToCart(product)}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
