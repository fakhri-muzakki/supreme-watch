import ProductList from "@/features/products/components/ProductList";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <>
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-28">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Supreme Watch
          </p>
          <h1 className="mt-2 text-4xl font-semibold md:text-5xl">
            Our Collection
          </h1>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <ProductList />
        </Suspense>
      </main>
    </>
  );
}
