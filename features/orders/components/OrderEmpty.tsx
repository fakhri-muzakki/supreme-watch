"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function OrderEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {/* ICON */}
      <div className="mb-6 rounded-full bg-muted p-6">
        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
      </div>

      {/* TEXT */}
      <h2 className="text-2xl font-semibold">No Orders Yet</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        You haven’t placed any orders yet. Start exploring our premium watch
        collection and find your perfect timepiece.
      </p>

      {/* CTA */}
      <Link href="/products" className="mt-6">
        <Button className="rounded-xl px-6">Browse Watches</Button>
      </Link>
    </div>
  );
}
