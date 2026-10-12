"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("woofe_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("woofe_cart", JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [...prevCart, { ...newItem, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size: string, color: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === id && item.size === size && item.color === color)
      )
    );
  };

  const updateQuantity = (
    id: string,
    size: string,
    color: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(id, size, color);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id && item.size === size && item.color === color) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
