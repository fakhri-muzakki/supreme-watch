"use client";

import { useQuery } from "@tanstack/react-query";

export function useProducts(params: {
  page: number;
  search?: string;
  sort?: string;
  category?: string;
}) {
  const query = new URLSearchParams({
    page: String(params.page),
    ...(params.search ? { search: params.search } : {}),
    ...(params.sort ? { sort: params.sort } : {}),
    ...(params.category ? { sort: params.category } : {}),
  });

  return useQuery({
    queryKey: ["admin-products", params],
    queryFn: async () => {
      const res = await fetch(`/api/products?${query.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
    // keepPreviousData: true,
  });
}
