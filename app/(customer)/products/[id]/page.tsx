import { createClient } from "@/lib/supabase/server";
import ProductDetail from "@/features/products/components/ProductDetail";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select(
      `
      *,
      categories (
        name,
        slug
      )
    `,
    )
    .eq("id", params.id)
    .single();

  if (error || !product) return notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <ProductDetail product={product} />
    </main>
  );
}
