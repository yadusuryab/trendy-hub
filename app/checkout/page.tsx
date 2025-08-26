"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import SHeading from "@/components/utils/section-heading";
import { calculateSubtotal, calculateTotalAmount, CartItem, validateForm } from "@/lib/orderUtils";
import { CustomerDetailsForm } from "@/components/checkout/checkout-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { PaymentMethod } from "@/components/checkout/payment-method";
import { site } from "@/lib/site-config";

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [shippingCharge, setShippingCharge] = useState(paymentMethod === "online" ? 80 : 80);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    contact1: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const subtotal = calculateSubtotal(cartItems);
  const totalAmount = calculateTotalAmount(subtotal, shippingCharge);

  const handlePaymentChange = (method: "online" | "cod") => {
    setPaymentMethod(method);
    setShippingCharge(method === "online" ? 0 : 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const onCheckout = async () => {
    if (!validateForm(customerDetails, cartItems)) return;

    setIsLoading(true);

    // Construct WhatsApp message
    const productsDetails = cartItems
      .map(
        (item:any) =>
          `- ${item.name} (${item.category.name}): ₹${item.offerPrice || item.price}\nLink : ${process.env.NEXT_PUBLIC_BASE_URL}/p/${item._id}`
      )
      .join("\n");

    const message = `New Order Details:\n\n*Customer Details:*\n- Name: ${customerDetails.name}\n- Email: ${customerDetails.email}\n- Contact: ${customerDetails.contact1}\n- Address: ${customerDetails.address}, ${customerDetails.district}, ${customerDetails.state}, ${customerDetails.pincode}\n\n*Order Summary:*\n${productsDetails}\n\n*Payment Method:* ${paymentMethod}\n*Total Amount:* ₹${subtotal}`;

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${site.phone}?text=${encodedMessage}`;

    // Redirect to WhatsApp
    window.location.href = whatsappUrl;

    setIsLoading(false);
  };

  if (cartItems.length === 0) {
    return (
      <main className="container mx-auto md:px-16 px-2 md:max-w-[700px]">
        <SHeading title="Checkout" description="Your cart is empty. Please add items to proceed." nolink />
      </main>
    );
  }

  return (
    <main className="container mx-auto md:px-16 px-2 md:max-w-[700px]">
      <SHeading title="Checkout" description="Verify all the information before checkout." nolink />
      <div className="mt-4 space-y-4">
        <Card>
          <CardHeader><CardTitle>Customer Details</CardTitle></CardHeader>
          <CardContent>
            <CustomerDetailsForm customerDetails={customerDetails} handleInputChange={handleInputChange} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
          <CardContent>
            <OrderSummary cartItems={cartItems} shippingCharge={shippingCharge} subtotal={subtotal} totalAmount={subtotal} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
          <CardContent>
            <PaymentMethod paymentMethod={'online'} handlePaymentChange={handlePaymentChange} handleCheckout={onCheckout} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
