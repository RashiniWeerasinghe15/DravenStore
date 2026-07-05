export type Gender = "men" | "women";

export type Fit = "Oversized" | "Slim Fit" | "Box Fit" | "Relaxed" | "Classic";

export interface Product {
  id: string;
  name: string;
  gender: Gender;
  fit: Fit;
  price: number;
  originalPrice?: number | null;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  stock: number;
  createdAt?: number;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
}

export interface Order {
  id?: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentMethod: "COD";
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  isAdmin?: boolean;
  wishlist: string[];
  createdAt: number;
}