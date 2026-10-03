"use client";

import { useState, useEffect, useCallback } from "react";

const CART_KEY = "gadgethub_cart";

/**
 * Cart hook — persists to localStorage
 * @returns {{
 *   cart: import('../types/index').CartItem[],
 *   addToCart: (product: import('../types/index').Product) => void,
 *   removeFromCart: (id: number) => void,
 *   updateQuantity: (id: number, qty: number) => void,
 *   clearCart: () => void,
 *   totalItems: number,
 *   totalPrice: number
 * }}
 */
export function useCart() {
  const [cart, setCart] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage once mounted
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) setCart(JSON.parse(stored));
    } catch (_) {}
    setHydrated(true);
  }, []);

  // Persist to localStorage on change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (_) {}
  }, [cart, hydrated]);

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          emoji: product.emoji,
          brand: product.brand,
          price: product.price,
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
      );
    }
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice };
}
