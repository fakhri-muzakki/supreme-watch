"use client";

import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductsToolbar from "./ProductsToolbar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Plus } from "lucide-react";
import ProductDialog from "./ProductDialog";
import type { Product } from "@/types/product";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function ProductsTable() {
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [search] = useQueryState("search");
  const [sort] = useQueryState("sort");
  const [category] = useQueryState("category");
  const queryClient = useQueryClient();

  const currentPage = Number(page);

  const { data, isLoading } = useProducts({
    page: currentPage,
    search: search ?? undefined,
    sort: sort ?? undefined,
    category: category ?? undefined,
  });

  // dialog state
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setSelected(product);
    setOpen(true);
  };

  const handleCreate = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      console.log("DELETE", id);

      const supabase = createClient();

      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) {
        toast.error("Failed to delete product");
        throw new Error(error.message);
      }

      toast.success("Deleted product successfully");
      // refresh data setelah delete sukses
      await queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    } catch (err) {
      console.error("Delete product failed:", err);
      alert("Gagal menghapus product");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <ProductsToolbar />

        <Button
          onClick={handleCreate}
          variant={"outline"}
          className="gap-2 rounded-xl"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-right"></th>
            </tr>
          </thead>

          <tbody>
            {data.data.map((product: Product) => (
              <tr key={product.id} className="border-t">
                {/* PRODUCT */}
                <td className="p-4 flex items-center gap-3">
                  <Image
                    src={product.image_url}
                    width={48}
                    height={48}
                    alt=""
                    className="rounded-lg object-cover"
                  />
                  <span className="font-medium">{product.name}</span>
                </td>

                {/* PRICE */}
                <td className="p-4">${product.price}</td>

                {/* STOCK */}
                <td className="p-4">{product.stock}</td>

                {/* STATUS */}
                <td className="p-4">
                  {product.is_active ? "Active" : "Inactive"}
                </td>

                {/* ACTION */}
                <td className="p-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(product)}>
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setPage(String(currentPage - 1))}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          disabled={!data.nextPage}
          onClick={() => setPage(String(currentPage + 1))}
        >
          Next
        </Button>
      </div>

      {/* MODAL */}
      <ProductDialog
        open={open}
        onClose={() => setOpen(false)}
        product={selected || undefined}
      />
    </div>
  );
}
