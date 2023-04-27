import React, { useReducer } from "react";
import CartContext from "./cart-context";
import classes from "../Components/Layout/HeaderCartButton.module.css";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    var cartLogo = document.querySelector(`.${classes.button}`);
    cartLogo.classList.add(classes.shake);
    setTimeout(function () {
      cartLogo.classList.remove(classes.shake);
    }, 1000);
    let updatedItems;
    const updatedTotalAmount =
      +state.totalAmount + +action.item.price * +action.item.amount;
    const found_item = state.items.find((item) => item.id === action.item.id);
    if (found_item) {
      updatedItems = state.items.map((item) => {
        if (item.id === action.item.id) {
          return {
            ...item,
            amount: +item.amount + +action.item.amount,
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
    const found_item = state.items.find((item) => item.id === action.id);
    const updatedTotalAmount = +state.totalAmount - +found_item.price;
    if (found_item.amount === 1) {
      return {
        items: state.items.filter((item) => {
          return item.id !== action.id;
        }),
        totalAmount: updatedTotalAmount.toFixed(2),
      };
    }
    return {
      items: state.items.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            amount: +item.amount - 1,
          };
        } else {
          return item;
        }
      }),
      totalAmount: updatedTotalAmount.toFixed(2),
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
