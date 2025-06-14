'use client';

import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('whatbytes-cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('whatbytes-cart');
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('whatbytes-cart', JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  const addToCart = (product, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = productId => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    if (isHydrated) {
      localStorage.removeItem('whatbytes-cart');
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        isHydrated, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};