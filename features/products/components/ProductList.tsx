"use client";

import { useQueryState } from "nuqs";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import { useEffect, useRef } from "react";
import type { Product } from "@/types/product";
import ProductFilters from "./ProductFilters";

const ProductList = () => {
  const [search] = useQueryState("search");
  const [category] = useQueryState("category");
  const [sort] = useQueryState("sort");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts({
    search,
    category,
    sort,
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
      <ProductFilters />
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.pages.flatMap((page) =>
          page.data.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          )),
        )}
      </section>

      <div ref={loadMoreRef} className="py-10 text-center">
        {isFetchingNextPage && <p>Loading...</p>}
        {!hasNextPage && <p>No more products</p>}
      </div>
    </>
  );
};

export default ProductList;
