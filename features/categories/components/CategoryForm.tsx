import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";

interface CategoryFormProps {
  handleSubmit: (
    onValid: SubmitHandler<{
      name: string;
      slug: string;
    }>,
    onInvalid?:
      | SubmitErrorHandler<{
          name: string;
          slug: string;
        }>
      | undefined,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<{
    name: string;
    slug: string;
  }>;
  register: UseFormRegister<{
    name: string;
    slug: string;
  }>;
  isSubmitting: boolean;
  isEdit: boolean;
  onSubmit: (values: { name: string; slug: string }) => Promise<void>;
}

const CategoryForm = ({
  handleSubmit,
  errors,
  register,
  isSubmitting,
  isEdit,
  onSubmit,
}: CategoryFormProps) => {
  const [name, setName] = useState("");
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* NAME */}
      <div>
        <label className="text-sm font-medium">Name</label>
        <Input
          placeholder="Category name"
          autoComplete="off"
          {...register("name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* SLUG */}
      <div>
        <label className="text-sm font-medium">Slug</label>
        <Input
          placeholder="category-slug"
          autoComplete="off"
          readOnly
          value={name.toLowerCase().replace(/\s+/g, "-")}
          {...register("slug")}
        />
        {errors.slug && (
          <p className="text-sm text-destructive">{errors.slug.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full rounded-xl"
        disabled={isSubmitting}
      >
        {isEdit ? "Update Category" : "Create Category"}
      </Button>
    </form>
  );
};

export default CategoryForm;
