"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

type Params = {
  search?: string | null;
  category?: string | null;
  sort?: string | null;
};

export function useProducts(params: Params) {
  return useInfiniteQuery({
    queryKey: ["products", params],

    queryFn: async ({ pageParam = 1 }) => {
      const query = new URLSearchParams({
        page: String(pageParam),
      });

      if (params.search) query.set("search", params.search);
      if (params.category) query.set("category", params.category);
      if (params.sort) query.set("sort", params.sort);

      const res = await fetch(`/api/products?${query.toString()}`);
      if (!res.ok) throw new Error("Failed fetch");

      return res.json();
    },

    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
}
