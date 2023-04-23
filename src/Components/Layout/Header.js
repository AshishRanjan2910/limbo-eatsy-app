import React from "react";
import classes from "./Header.module.css";

import headerImg from "../../assets/walle.png";
import limboEatsyLogo from "../../assets/limbo-eatsy-logo.png";

function Header() {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <span className={classes.logo}>
          <img src={limboEatsyLogo} alt="LimboEatsy" />
          <h1>LimboEatsy</h1>
        </span>
        <button>Cart</button>
      </header>
      <div className={classes["main-image"]}>
        <img src={headerImg} alt="Eating food is now become limbo-eatsy..." />
      </div>
    </React.Fragment>
  );
}

export default Header;
