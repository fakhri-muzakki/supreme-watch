// export interface MidtransBody {
//   transaction_time: Date;
//   transaction_status: string;
//   transaction_id: string;
//   status_message: string;
//   status_code: string;
//   signature_key: string;
//   settlement_time: Date;
//   payment_type: string;
//   order_id: string;
//   merchant_id: string;
//   gross_amount: string;
//   fraud_status: string;
//   currency: string;
// }

export interface MidtransBody {
  va_numbers: VaNumber[];
  transaction_time: Date;
  transaction_status: string;
  transaction_id: string;
  status_message: string;
  status_code: string;
  signature_key: string;
  settlement_time: Date;
  payment_type: string;
  payment_amounts: PaymentAmounts[];
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  fraud_status: string;
  expiry_time: Date;
  customer_details: CustomerDetails;
  currency: string;
}

export interface CustomerDetails {
  full_name: string;
  email: string;
}

export interface VaNumber {
  va_number: string;
  bank: string;
}

export interface PaymentAmounts {
  paid_at: string;
  amount: string;
}
