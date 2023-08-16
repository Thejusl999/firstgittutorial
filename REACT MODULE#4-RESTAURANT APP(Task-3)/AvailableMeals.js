import React, { useState } from "react";
import classes from "./AvailableMeals.module.css";
const AvailableMeals = (props) => {
  return (
    <div className={classes.meals}>
      {props.meals.map((meal) => (
        <div className={classes.eachMeal}>
          <h3 className={classes.name}>{meal.name}</h3>
          <h4 className={classes.category}>{meal.category}</h4>
          <h3 className={classes.price}>${meal.price}</h3>
        </div>
      ))}
    </div>
  );
};
export default AvailableMeals;
