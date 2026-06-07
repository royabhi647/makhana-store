import React, { createContext, useState, useEffect } from 'react';
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [shippingAddress, setShippingAddress] = useState(() => {
    const savedAddress = localStorage.getItem('shippingAddress');
    return savedAddress ? JSON.parse(savedAddress) : { address: '', city: '', postalCode: '', country: '' };
  });
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  // Sync cart with local storage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  // Sync shipping address
  useEffect(() => {
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
  }, [shippingAddress]);
  const addToCart = (product, qty = 1, isCustom = false, customDetails = null) => {
    setCartItems((prevItems) => {
      // For custom mixes, generate a unique key based on name & combination
      const uniqueId = isCustom ? customDetails.mixId : product._id;
      const existItem = prevItems.find((x) => x.id === uniqueId);
      if (existItem) {
        return prevItems.map((x) =>
          x.id === uniqueId ? { ...x, qty: x.qty + qty } : x
        );
      } else {
        return [
          ...prevItems,
          {
            id: uniqueId,
            product: product._id || uniqueId,
            name: isCustom ? customDetails.name : product.name,
            image: isCustom ? 'custom-bowl' : product.image || '',
            price: isCustom ? customDetails.price : product.price,
            stock: isCustom ? 99 : product.stock,
            qty,
            isCustom,
            customDetails,
            color: product.color || '#C19A6B'
          },
        ];
      }
    });
  };
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((x) => x.id !== id));
  };
  const updateQty = (id, qty) => {
    setCartItems((prevItems) =>
      prevItems.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x))
    );
  };
  const clearCart = () => {
    setCartItems([]);
  };
  // Calculations
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 30 ? 0 : itemsPrice === 0 ? 0 : 5.99;
  const taxPrice = itemsPrice * 0.08;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  return (
    <CartContext.Provider
      value={{
        cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: Number(itemsPrice.toFixed(2)),
        shippingPrice: Number(shippingPrice.toFixed(2)),
        taxPrice: Number(taxPrice.toFixed(2)),
        totalPrice: Number(totalPrice.toFixed(2)),
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        setShippingAddress,
        setPaymentMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
