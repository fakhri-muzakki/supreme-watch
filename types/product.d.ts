export interface Product {
  id: string;
  slug: string;
  name: string;
  stock: number;
  price: number;
  is_active: boolean;
  image_url: string;
  category_id: string;
  description: string;
  updated_at: string;
}
