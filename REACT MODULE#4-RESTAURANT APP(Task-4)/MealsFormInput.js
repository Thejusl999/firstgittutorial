import React from "react";
import classes from "./MealsFormInput.module.css";
const MealsFormInput = (props) => {
  return (
    <div className={classes["form-div"]}>
      <form>
        <label>{props.label}</label>
        <input
          className={classes["form-input"]}
          type={props.number}
          placeholder="1"
        />
        <br></br>
        <button className={classes.button}>+Add</button>
      </form>
    </div>
  );
};
export default MealsFormInput;
