import React, { useRef, useState } from "react";

import Input from "../UI/Input/Input";
import classes from "./MealItemForm.module.css";

const MealsItemForm = (props) => {
  const [isFormValid, setIsFormValid] = useState(true);
  const amountInputRef = useRef();

  const addMealHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setIsFormValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={addMealHandler}>
      <Input
        ref={amountInputRef}
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
      <button type="submit">+ Add</button>
      {!isFormValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealsItemForm;
