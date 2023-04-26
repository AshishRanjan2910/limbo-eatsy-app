// import './App.css';
import React from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App(props) {
  const [isCardShown, setIsCartShown] = React.useState(false);
  const showCartHandler = () => {
    setIsCartShown(true);
  };
  const hideCartHandler = () => {
    setIsCartShown(false);
  };

  return (
    <CartProvider >
      <Header onShowCart={showCartHandler} />
      {isCardShown && <Cart onCloseCart={hideCartHandler} />}
      <Meals />
    </CartProvider>
  );
}

export default App;
