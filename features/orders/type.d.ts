export interface Order {
  id: string;
  user_id: string;
  status: string;
  total_amount: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  midtrans_order_id: string;
  midtrans_token: string;
  created_at: Date;
  updated_at: Date;
  order_items: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  quantity: number;
  subtotal: number;
  created_at: Date;
  product_id: string;
  product_name: string;
  product_image: string;
  price_snapshot: number;
}
