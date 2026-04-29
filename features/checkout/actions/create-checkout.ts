"use server";

import { snap } from "@/lib/midtrans";

export async function createCheckout() {
  const parameter = {
    transaction_details: {
      order_id: `ORDER-${Date.now()}`,
      gross_amount: 150000,
    },
    customer_details: {
      first_name: "Fakhri",
      email: "fakhri@mail.com",
    },
  };

  const transaction = await snap.createTransaction(parameter);

  return {
    token: transaction.token,
    redirectUrl: transaction.redirect_url,
  };
}
