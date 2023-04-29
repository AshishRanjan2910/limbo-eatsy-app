import React, { useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card/Card";
import MealItem from "./MealItem";

function AvailableMeals() {
  const [meals, setMeals] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [httpError, setHttpError] = React.useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const loadedMeals = [];
      const response = await fetch(
        "https://react-http-b1374-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data from server.");
      }
      const responseData = await response.json();
      for (const key in responseData) {
        responseData[key] &&
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
      }
      setIsLoading(false);
      setMeals(loadedMeals);
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
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

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}:/</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
