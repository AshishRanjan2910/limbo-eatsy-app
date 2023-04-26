import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let updatedItems;
    const updatedTotalAmount = (+state.totalAmount) + (+action.item.price) * (+action.item.amount);
    const found_item = state.items.find((item) => item.id === action.item.id)
    if (found_item) {
      updatedItems = state.items.map((item) => {
        if (item.id === action.item.id) {
          return {
            ...item,
            amount: (+item.amount) + (+action.item.amount),
          };
        } else {
          return item;
        }
      });
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount.toFixed(2),
    };
  } else if (action.type === "REMOVE") {
    const updatedItems = state.items.filter((item) => item.id !== action.id);
    const updatedTotalAmount = (+state.totalAmount) - (+action.item.price);
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount.toFixed(2),
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;