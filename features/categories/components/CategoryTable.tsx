"use client";

import { useState } from "react";
import type { Category } from "../category";
import { useCategories } from "../hooks/useCategories";
import { deleteCategory } from "../category.service";
import { Button } from "@/components/ui/button";
import CategoryModal from "./CategoryModal";

const CategoryTable = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Category | null>(null);

  const { data, isLoading, refetch, page, setPage, limit } = useCategories();

  const handleEdit = (cat: Category) => {
    console.log(cat);
    setSelected(cat);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      refetch();
    } catch (err) {
      console.error(err);
      alert("Gagal delete category");
    }
  };

  const totalPages = data?.count ? Math.ceil(data.count / limit) : 1;

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Categories</h1>

        <Button
          className="rounded-xl"
          variant={"outline"}
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
        >
          Add Category
        </Button>
      </div>

      {/* TABLE */}
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3">No</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Slug</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.data?.map((cat: Category, i: number) => (
              <tr key={cat.id} className="border-t">
                <td className="p-3">{(page - 1) * limit + i + 1}</td>
                <td className="p-3">{cat.name}</td>
                <td className="p-3">{cat.slug}</td>
                <td className="p-3 space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(cat)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(cat.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isLoading && (
          <p className="p-4 text-sm text-muted-foreground">
            Loading categories...
          </p>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>

        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </p>

        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>

      {/* MODAL */}
      {open && (
        <CategoryModal
          open={open}
          onClose={() => setOpen(false)}
          refetch={refetch}
          initialData={selected || undefined}
        />
      )}
    </>
  );
};

export default CategoryTable;
