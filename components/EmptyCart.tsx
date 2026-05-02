import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      {/* ICON */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full border bg-muted">
        <ShoppingCart className="h-8 w-8 text-muted-foreground" />
      </div>

      {/* TEXT */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">Your cart is empty</h3>
        <p className="text-sm text-muted-foreground">
          Looks like you haven’t added anything yet.
        </p>
      </div>

      {/* CTA */}
      <Button asChild className="rounded-xl">
        <Link href="/products">Start Shopping</Link>
      </Button>
    </div>
  );
}
