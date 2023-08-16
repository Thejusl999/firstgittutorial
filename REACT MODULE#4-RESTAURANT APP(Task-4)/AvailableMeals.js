import React from "react";
import MealsFormInput from "./MealsFormInput";
import classes from "./AvailableMeals.module.css";
const AvailableMeals = (props) => {
  return (
    <div className={classes.meals}>
      {props.meals.map((meal) => (
        <div className={classes.eachMeal} key={Math.random()}>
          <h3 className={classes.name}>{meal.name}</h3>
          <h4 className={classes.category}>{meal.category}</h4>
          <h3 className={classes.price}>${meal.price}</h3>
          <MealsFormInput label="Amount" type="number" />
        </div>
      ))}
    </div>
  );
};
export default AvailableMeals;
