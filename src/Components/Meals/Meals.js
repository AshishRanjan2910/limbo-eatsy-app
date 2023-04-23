import classes from './Meals.module.css';
import Header from '../Layout/Header';
import Cart from '../Cart/Cart';

function Meals() {
  return (
    <div className={classes.Meals}>
      <Header />
      <Cart />
    </div>
  );
}

export default Meals;