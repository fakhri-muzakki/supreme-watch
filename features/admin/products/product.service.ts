import { createClient } from "@/lib/supabase/client";

export async function createProduct(payload: {
  name: string;
  price: number;
  stock: number;
  image_url?: string | null;
}) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .insert({
      name: payload.name,
      slug: payload.name.toLowerCase().replace(/\s+/g, "-"),
      price: payload.price,
      stock: payload.stock,
      image_url: payload.image_url ?? null,
      is_active: true,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateProduct(
  id: string,
  payload: {
    name: string;
    price: number;
    stock: number;
    image_url?: string | null;
  },
) {
  const supabase = createClient();

  const slug = payload.name
    ? payload.name.toLowerCase().replace(/\s+/g, "-")
    : undefined;
  const { data, error } = await supabase
    .from("products")
    .update({
      name: payload.name,
      slug: slug,
      price: payload.price,
      stock: payload.stock,
      image_url: payload.image_url ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
