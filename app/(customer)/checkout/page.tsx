import CheckoutForm from "@/features/checkout/components/checkoutForm";
import Script from "next/script";

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-28">
      <div className="mb-12 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Supreme Watch
        </p>
        <h1 className="mt-2 text-4xl font-semibold">Checkout</h1>
      </div>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="afterInteractive"
      />
      <CheckoutForm />
    </main>
  );
}
