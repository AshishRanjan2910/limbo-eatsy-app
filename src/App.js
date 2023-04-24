// import './App.css';
import React from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";

function App() {
  const [isCardShown, setIsCartShown] = React.useState(false);
  const showCartHandler = () => {
    setIsCartShown(true);
  };
  const hideCartHandler = () => {
    setIsCartShown(false);
  };

  return (
    <React.Fragment>
      <Header onShowCart={showCartHandler}/>
      {isCardShown && <Cart onCloseCart={hideCartHandler}/>}
      <Meals />
    </React.Fragment>
  );
}

export default App;
