"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCategories } from "@/features/categories/category.service";

export function useCategories() {
  const [page, setPage] = useState(1);
  const limit = 6;

  const query = useQuery({
    queryKey: ["categories", page],
    queryFn: () => getCategories({ page, limit }),
  });

  return {
    ...query,
    page,
    limit,
    setPage,
  };
}
