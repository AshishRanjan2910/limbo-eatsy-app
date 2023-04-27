import React, {useState} from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = React.useContext(CartContext);
  const [isCartChanged, setIsCartChanged] = useState(false);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    if (!item) {
      return curNumber;
    } else {
      return +curNumber + +item.amount;
    }
  }, 0);

  const btnClass = `${classes.button} ${isCartChanged ? classes.shake : ""}`

  const { items } = cartCtx;

  React.useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsCartChanged(true);
    const timer = setTimeout(() => {
      setIsCartChanged(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes["cart-text"]}>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
