import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";

function Cart(props) {
  const hasItems = true;
  const totalAmount = 29.49;

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {[
        { id: "c1", name: "Sushi", amount: 2, price: 12.99 },
        { id: "c2", name: "Schnitzel", amount: 1, price: 16.5 },
      ].map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>Close</button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
