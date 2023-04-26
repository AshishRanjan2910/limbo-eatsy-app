import React, {useContext} from "react";

import Input from "../UI/Input/Input";
import classes from "./MealItemForm.module.css";
import CartContext from "../../store/cart-context";

const MealsItemForm = (props) => {
  const cartCtx = useContext(CartContext);

  const addMealHandler = (event) => {
    event.preventDefault();
    const amount = event.target[0].value;
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
    console.log(cartCtx.items);
  };

  return (
    <form className={classes.form} onSubmit={addMealHandler}>
      <Input
        label={"Amount:"}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type='submit'>+ Add</button>
    </form>
  );
};

export default MealsItemForm;
