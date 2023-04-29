import React, { useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card/Card";
import MealItem from "./MealItem";

function AvailableMeals() {
  const [meals, setMeals] = React.useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-b1374-default-rtdb.firebaseio.com/meals.json"
      );
      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        responseData[key] && loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
    };
    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));


  return (
    <section className={classes.meals}>
      <Card>
        {mealsList.length === 0 && <p>Loading...</p>}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
