import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import { useContext } from "react";
import cartContext from "../../store/cart-context";

function Cart(props) {
  const cartCtx = useContext(cartContext);
  const hasItems = cartCtx.items.length > 0;
  const totalAmount = cartCtx.totalAmount;

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <li key={item.id} className={classes["item-info"]}>
          <div>
            {item.name} ({item.amount})
          </div>{" "}
          <div>₹{item.price*item.amount}</div>
        </li>
      ))}
    </ul>
  );

  return (
    <Modal onClickOnModal={props.onCloseCart}>
      {cartItems}
      {hasItems && <hr />}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>₹{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
