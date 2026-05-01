export type StatusOrder =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  user_id: string;
  status: Status;
  total_amount: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  midtrans_order_id: string;
  midtrans_token: string;
  created_at: Date;
  updated_at: Date;
}

export type SortOrder = "asc" | "desc";

export interface OrderDetail {
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
  payments: Payment[];
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

export interface Payment {
  id: string;
  status: string;
  paid_at: Date;
  order_id: string;
  created_at: Date;
  updated_at: Date;
  paid_amount: number;
  payment_type: string;
  payment_method: string;
  midtrans_response: MidtransResponse;
  midtrans_transaction_id: string;
}

export interface MidtransResponse {
  currency: string;
  order_id: string;
  va_numbers: VaNumber[];
  expiry_time: Date;
  merchant_id: string;
  status_code: string;
  fraud_status: string;
  gross_amount: string;
  payment_type: string;
  signature_key: string;
  status_message: string;
  transaction_id: string;
  payment_amounts: PaymentAmount[];
  settlement_time: Date;
  customer_details: CustomerDetails;
  transaction_time: Date;
  transaction_status: string;
}

export interface CustomerDetails {
  email: string;
  full_name: string;
}

export interface PaymentAmount {
  amount: string;
  paid_at: Date;
}

export interface VaNumber {
  bank: string;
  va_number: string;
}
