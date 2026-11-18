import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div>
      <h1 className="h-big mb-2">Checkout</h1>
      <p className="mb-6 max-w-xl font-semibold">Mock checkout. Nothing is charged or sent anywhere. Do not enter real card details.</p>
      <CheckoutForm />
    </div>
  );
}
