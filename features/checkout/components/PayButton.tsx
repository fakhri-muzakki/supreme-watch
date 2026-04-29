"use client";

import { createCheckout } from "@/features/checkout/actions/create-checkout";

export default function PayButton() {
  async function handlePay() {
    const res = await createCheckout();

    window.snap.pay(res.token, {
      onSuccess: function () {
        window.location.href = "/orders";
      },
      onPending: function () {
        window.location.href = "/orders";
      },
      onError: function () {
        alert("Payment failed");
      },
    });
  }

  return <button onClick={handlePay}>Bayar</button>;
}
