import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Load cart from localStorage on initial load
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product, selectedSize, quantity) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart (same product and size)
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.size === selectedSize.size
      );

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, {
          id: product.id,
          name: product.name,
          image: product.image,
          size: selectedSize.size,
          price: selectedSize.price,
          quantity: quantity,
          category: product.category
        }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId, size) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.id === itemId && item.size === size))
    );
  };

  // Update item quantity
  const updateQuantity = (itemId, size, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate cart totals
  const cartTotal = cartItems.reduce((total, item) => {
    const price = parseInt(item.price.replace('GH₵ ', ''));
    return total + (price * item.quantity);
  }, 0);

  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};