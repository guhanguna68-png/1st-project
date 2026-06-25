import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, User, Order } from '../types';
import { FESTIVAL_OFFERS } from '../data';

interface ShopContextType {
  user: User | null;
  login: (name: string, email: string, phone?: string) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (
    product: Product,
    quantity: number,
    selectedSize: string,
    options: { eggless: boolean; sugarFree: boolean; customMessage: string }
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  appliedCoupon: { code: string; discountPercent: number; minAmount: number } | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  clearCoupon: () => void;
  orders: Order[];
  placeOrder: (deliveryDetails: any) => { success: boolean; order: Order };
  activeTab: 'home' | 'shop' | 'about' | 'orders' | 'wishlist';
  setActiveTab: (tab: 'home' | 'shop' | 'about' | 'orders' | 'wishlist') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  // Load initial state from LocalStorage
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('srm_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('srm_cart');
    return stored ? JSON.parse(stored) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const stored = localStorage.getItem('srm_wishlist');
    return stored ? JSON.parse(stored) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = localStorage.getItem('srm_orders');
    return stored ? JSON.parse(stored) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'about' | 'orders' | 'wishlist'>('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Persist states to LocalStorage
  useEffect(() => {
    localStorage.setItem('srm_user', user ? JSON.stringify(user) : '');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('srm_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('srm_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('srm_orders', JSON.stringify(orders));
  }, [orders]);

  // Auth Operations
  const login = (name: string, email: string, phone?: string) => {
    const newUser: User = { name, email, phone, address: '' };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setAppliedCoupon(null);
    setWishlist([]);
    setActiveTab('home');
  };

  // Cart Operations
  const addToCart = (
    product: Product,
    quantity: number,
    selectedSize: string,
    options: { eggless: boolean; sugarFree: boolean; customMessage: string }
  ) => {
    const cartItemId = `${product.id}-${selectedSize}-${options.eggless ? 'eggless' : 'with-egg'}-${options.sugarFree ? 'sugarfree' : 'regular'}-${options.customMessage ? encodeURIComponent(options.customMessage) : 'none'}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          product,
          quantity,
          selectedSize,
          eggless: options.eggless,
          sugarFree: options.sugarFree,
          customMessage: options.customMessage,
        };
        return [...prevCart, newItem];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist Operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Coupon Operations
  const applyCoupon = (code: string) => {
    const coupon = FESTIVAL_OFFERS.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code.' };
    }

    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    if (subtotal < coupon.minAmount) {
      return {
        success: false,
        message: `Min. purchase value of ₹${coupon.minAmount} is required for this coupon.`,
      };
    }

    setAppliedCoupon(coupon);
    return { success: true, message: `Coupon Applied! Saved ${coupon.discountPercent}%.` };
  };

  const clearCoupon = () => {
    setAppliedCoupon(null);
  };

  // Checkout Operations
  const placeOrder = (deliveryDetails: any) => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    let discountApplied = 0;
    if (appliedCoupon) {
      discountApplied = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    }
    const totalAmount = subtotal - discountApplied;

    const newOrder: Order = {
      id: `SRM-ORD-${Date.now().toString().slice(-6)}`,
      items: [...cart],
      totalAmount,
      discountApplied,
      deliveryDetails,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setActiveTab('orders');

    return { success: true, order: newOrder };
  };

  return (
    <ShopContext.Provider
      value={{
        user,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        appliedCoupon,
        applyCoupon,
        clearCoupon,
        orders,
        placeOrder,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
