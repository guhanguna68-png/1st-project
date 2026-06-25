export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Cakes' | 'Sweets' | 'Gift Boxes' | 'Bakery Items' | 'Festival Specials';
  rating: number;
  reviewsCount: number;
  image: string;
  tags: string[];
  ingredients?: string[];
  nutritionalInfo?: string;
  sizes: string[];
  customizable?: boolean;
}

export interface CartItem {
  id: string; // unique cart item id (product.id + size + options string)
  product: Product;
  quantity: number;
  selectedSize: string;
  eggless: boolean;
  sugarFree: boolean;
  customMessage: string;
}

export interface User {
  email: string;
  name: string;
  phone?: string;
  address?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  discountApplied: number;
  deliveryDetails: {
    name: string;
    phone: string;
    address: string;
    date: string;
    timeSlot: string;
    message: string;
  };
  status: 'Pending' | 'Baking' | 'Out for Delivery' | 'Delivered';
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}
