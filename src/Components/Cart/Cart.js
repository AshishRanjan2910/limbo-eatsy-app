import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import { useContext } from "react";
import cartContext from "../../store/cart-context";
import CartItem from "./CartItem";

function Cart(props) {
  const cartCtx = useContext(cartContext);
  const hasItems = cartCtx.items.length > 0;
  const totalAmount = `₹${cartCtx.totalAmount}`;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          className={classes["item-info"]}
          item={item}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const orderPlaceHandler = () => {
    cartCtx.clearCart();
    return alert("Order Placed Successfully");
  }

  return (
    <Modal onClickOnModal={props.onCloseCart}>
      {cartItems}
      {hasItems ? (
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
      ) : (
        <p className={classes["no-items"]}>No items in cart</p>
      )}
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderPlaceHandler}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
