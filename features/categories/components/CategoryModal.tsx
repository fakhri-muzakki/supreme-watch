"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { createCategory, updateCategory } from "../category.service";
import { categorySchema, type CategoryValues } from "../schema";
import CategoryForm from "./CategoryForm";

type Props = {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
  initialData?: { id: string; name: string; slug: string };
};

export default function CategoryModal({
  open,
  onClose,
  refetch,
  initialData,
}: Props) {
  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryValues>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ name: "", slug: "" });
    }
  }, [initialData, reset]);

  const onSubmit = async (values: CategoryValues) => {
    try {
      if (isEdit && initialData) {
        await updateCategory(initialData.id, values);
      } else {
        await createCategory(values);
      }

      refetch();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan category");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md space-y-6">
        <DialogTitle className="text-xl font-semibold">
          {isEdit ? "Edit Category" : "Add Category"}
        </DialogTitle>

        <CategoryForm
          handleSubmit={handleSubmit}
          errors={errors}
          isEdit={isEdit}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          register={register}
        />
      </DialogContent>
    </Dialog>
  );
}
