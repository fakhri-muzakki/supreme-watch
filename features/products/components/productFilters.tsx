"use client";

import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function ProductFilters() {
  const [category, setCategory] = useQueryState("category");
  const [sort, setSort] = useQueryState("sort");

  const [search, setSearch] = useQueryState("search");
  const [input, setInput] = useState(search ?? "");
  const [debounced] = useDebounce(input, 500);

  useEffect(() => {
    setSearch(debounced || null);
  }, [debounced, setSearch]);

  return (
    <div className="mb-10 flex justify-between gap-x-2">
      {/* SEARCH */}
      <Input
        placeholder="Search watches..."
        className="max-w-96"
        value={input ?? ""}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex gap-2 flex-wrap">
        {/* CATEGORY */}
        <Select
          value={category ?? "all"}
          onValueChange={(val) => setCategory(val === "all" ? null : val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="mens-watches">Men&apos;s Watches</SelectItem>
            <SelectItem value="womens-watches">Women&apos;s Watches</SelectItem>
          </SelectContent>
        </Select>

        {/* SORT */}
        <Select value={sort ?? ""} onValueChange={(val) => setSort(val)}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price_asc">Price: Low → High</SelectItem>
            <SelectItem value="price_desc">Price: High → Low</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
