export interface CartItem {
  _id: string;
  name: string; // Updated from productName to name
  category: {
    name: string;
    slug: string;
  };
  images: { asset: { url: string } }[];
  offerPrice?: number;
  price: number;
  selectedSize?: number; // Optional selected size
  freeProduct?: {
    _id: string;
    name: string; // Updated from productName to name
    category: {
      name: string;
      slug: string;
    };
    images: { asset: { url: string } }[];
    selectedSize?: number; // Optional selected size
  } | null;
  }
  
  export const calculateSubtotal = (cartItems: CartItem[]) =>
    cartItems.reduce((total, item) => total + (item.offerPrice || item.price), 0);
  
  export const calculateTotalAmount = (subtotal: number, shippingCharge: number) => {

    return subtotal + shippingCharge ;
  };
  
  export const validateForm = (customerDetails: {
    name: string;
    email: string;
    contact1: string;
    address: string;
  }, cartItems: CartItem[]) => {
    if (!customerDetails.name || !customerDetails.email || !customerDetails.contact1 || !customerDetails.address) {
      alert("Please fill all the required fields.");
      return false;
    }
  
    if (!/^\d{10}$/.test(customerDetails.contact1)) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }
  
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items to proceed.");
      return false;
    }
  
    return true;
  };