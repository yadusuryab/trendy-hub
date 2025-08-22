import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PaymentMethodProps {
  paymentMethod: "online";
  handlePaymentChange: (method: "online") => void;
  handleCheckout: () => void;
  isLoading: boolean;
}

export const PaymentMethod = ({
  paymentMethod,
  handlePaymentChange,
  handleCheckout,
  isLoading,
}: PaymentMethodProps) => (
  <div className="space-y-4">
    <div>
      <p>Payment mode : Online Payment</p>
    </div>
    <div>
      <p>By placing order you agree to our <Link href="/T&C" className="underline">Terms & Conditions.</Link></p>
    </div>
    <Button className="w-full" onClick={handleCheckout} disabled={isLoading}>
      {isLoading ? "Processing..." : "Place Order"}
    </Button>
  </div>
);