import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearCart: () => {},
});
export const useCartContext = () => useContext(CartContext);
const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
  };
  const removeItemFromCart = (item) => {
    setCartItems(cartItems.filter((cartItem) => cartItem !== item));
  };

  const clearCart = () => {
    setCartItems([]);
  };
  return (
    <CartContext.Provider
      value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
