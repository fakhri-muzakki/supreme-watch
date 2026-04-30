"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { productSchema, ProductValues } from "../schema";
import { uploadImage } from "@/lib/uploadImage";
import type { Product } from "@/types/product";
import { createProduct, updateProduct } from "../product.service";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  onClose: () => void;
  product?: Product;
};

export default function ProductDialog({ open, onClose, product }: Props) {
  const isEdit = !!product;

  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductValues>({
    resolver: zodResolver(productSchema),
  });

  const imageWatch = watch("image");

  // 🔥 handle preview
  useEffect(() => {
    if (imageWatch && imageWatch.length > 0) {
      const file = imageWatch[0];
      const url = URL.createObjectURL(file);
      setPreview(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [imageWatch]);

  // 🔥 reset form
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        stock: product.stock,
        image: undefined,
      });

      setPreview(product.image_url ?? null);
    } else {
      reset({
        name: "",
        price: 0,
        stock: 0,
        image: undefined,
      });

      setPreview(null);
    }
  }, [product, reset]);

  const onSubmit = async (values: ProductValues) => {
    try {
      let imageUrl = product?.image_url;

      const file = values.image?.[0];

      if (file) {
        imageUrl = await uploadImage(file);
      }

      const payload = {
        name: values.name,
        price: values.price,
        stock: values.stock,
        image_url: imageUrl,
      };

      if (isEdit && product?.id) {
        await updateProduct(product.id, payload);
        toast.success("Updated product successfully");
      } else {
        await createProduct(payload);
        toast.success("Created product successfully");
      }

      onClose();
    } catch (err) {
      console.error(err);
      alert("Upload gagal");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md space-y-6">
        <DialogTitle className="text-xl font-semibold">
          {isEdit ? "Edit Product" : "Add Product"}
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* NAME */}
          {/* NAME */}
          <div>
            <label className="text-sm font-medium">Product Name</label>
            <Input placeholder="Product Name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm font-medium">Price</label>
            <Input type="number" placeholder="Price" {...register("price")} />
            {errors.price && (
              <p className="text-sm text-destructive">{errors.price.message}</p>
            )}
          </div>

          {/* STOCK */}
          <div>
            <label className="text-sm font-medium">Stock</label>
            <Input type="number" placeholder="Stock" {...register("stock")} />
            {errors.stock && (
              <p className="text-sm text-destructive">{errors.stock.message}</p>
            )}
          </div>

          {/* IMAGE */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Product Image</label>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setValue("image", e.target.files as FileList)}
            />

            {errors.image && (
              <p className="text-sm text-destructive">
                {errors.image.message as string}
              </p>
            )}

            {/* PREVIEW */}
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="h-32 w-32 object-cover rounded-xl border"
              />
            )}
          </div>

          <Button
            type="submit"
            className="w-full rounded-xl"
            disabled={isSubmitting}
          >
            {isEdit ? "Update Product" : "Create Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
