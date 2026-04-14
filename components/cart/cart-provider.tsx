"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product } from "@/types";

export type CartItem = {
  key: string;
  product: Product;
  quantity: number;
  selectedOption: string;
};

type CartContextType = {
  items: CartItem[];
  count: number;
  isOpen: boolean;
  addItem: (product: Product, selectedOption?: string, quantity?: number) => void;
  updateQuantity: (itemKey: string, quantity: number) => void;
  removeItem: (itemKey: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("aether-cart");
    if (!saved) return;
    try {
      setItems(JSON.parse(saved) as CartItem[]);
    } catch {
      window.localStorage.removeItem("aether-cart");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("aether-cart", JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextType>(
    () => ({
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      isOpen,
      addItem(product, selectedOption, quantity = 1) {
        setItems((current) => {
          const option = selectedOption ?? product.sizeOptions[0];
          const key = `${product.id}:${option}`;
          const existing = current.find((item) => item.key === key);
          if (existing) {
            return current.map((item) => (item === existing ? { ...item, quantity: item.quantity + quantity } : item));
          }
          return [...current, { key, product, quantity, selectedOption: option }];
        });
        setIsOpen(true);
      },
      updateQuantity(itemKey, quantity) {
        setItems((current) =>
          current
            .map((item) => (item.key === itemKey ? { ...item, quantity } : item))
            .filter((item) => item.quantity > 0)
        );
      },
      removeItem(itemKey) {
        setItems((current) => current.filter((item) => item.key !== itemKey));
      },
      clearCart() {
        setItems([]);
      },
      openCart() {
        setIsOpen(true);
      },
      closeCart() {
        setIsOpen(false);
      }
    }),
    [isOpen, items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
