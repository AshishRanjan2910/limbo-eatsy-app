import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const nameInput = useInput(isNotEmpty);
  const streetInput = useInput(isNotEmpty);
  const cityInput = useInput(isNotEmpty);
  const pincodeInput = useInput(isSixChars);

  const inputs = [nameInput, streetInput, cityInput, pincodeInput];
  const inputsName = ["Name", "Street", "City", "Pincode"];
  const isFormValid = inputs.every((input) => input.valueIsValid);

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!isFormValid) {
      inputs.forEach((input) => input.inputBlurHandler());
      return;
    }

    props.onConfirm({
      name: nameInput.enteredValue,
      street: streetInput.enteredValue,
      city: cityInput.enteredValue,
      pincode: pincodeInput.enteredValue,
    });

    inputs.forEach((input) => input.reset());
  };

  const errorClass = classes.invalid;
  const inputClasses = inputs.map((input) => {
    const hasError = input.hasError;
    return `${classes.control} ${hasError ? errorClass : ""}`;
  });

  const checkoutData = inputs.map((input, index) => {
    const alias = inputsName[index];
    return (
      <div className={inputClasses[index]} key={index}>
        <label htmlFor={alias.toLowerCase()}>{alias}</label>
        <input
          value={input.enteredValue}
          type="text"
          id={alias.toLowerCase()}
          onChange={input.valueChangeHandler}
          onBlur={input.inputBlurHandler}
        />
        {input.hasError && (
          <p className={classes["error-text"]}>
            {index !== 3
              ? `${alias} must not be empty`
              : "Pincode must be 6 characters long"}
          </p>
        )}
      </div>
    );
  });

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      {checkoutData}
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!isFormValid}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
