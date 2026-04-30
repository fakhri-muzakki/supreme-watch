"use client";

import { Input } from "@/components/ui/input";
import { useQueryState } from "nuqs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductsToolbar() {
  const [search, setSearch] = useQueryState("search");
  const [category, setCategory] = useQueryState("category");
  const [sort, setSort] = useQueryState("sort");

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Input
        placeholder="Search product..."
        value={search ?? ""}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

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

      <Select value={sort ?? ""} onValueChange={setSort}>
        <SelectTrigger className="w-50">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price_asc">Price ↑</SelectItem>
          <SelectItem value="price_desc">Price ↓</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
