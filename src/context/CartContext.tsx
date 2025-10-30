import React, { createContext, useContext, useState, type ReactNode } from "react";
import toast from "react-hot-toast";

// Cart item type
export type CartItem = {
  id: number;
  title: string;
  img?: string;
  description?: string;
  price: number;
  quantity: number;
};

// Context type
type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add item to cart
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
    toast.success(`${item.title} added to cart!`);
  };

  // --- UPDATED --- Remove item from cart with specific notification
  const removeFromCart = (id: number) => {
    // Find the item first to get its title for the notification
    const itemToRemove = cart.find(item => item.id === id);
    
    setCart((prev) => prev.filter((i) => i.id !== id));

    // Show a more specific toast message if the item was found
    if (itemToRemove) {
      toast.error(`${itemToRemove.title} removed from cart.`);
    }
  };
  
  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
    toast.success("Cart has been cleared.");
  };

  // Increase quantity
  const increaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(i.quantity - 1, 1) } : i
      )
    );
  };

  // Totals
  const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

