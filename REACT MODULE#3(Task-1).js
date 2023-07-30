// REACT MODULE#3 - TASK-1 DELIVERABLES

// UDEMY TRAINER'S CODE (as per videos 2 & 3)
import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import "./CourseInput.css";
const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const goalInputChangeHandler = (event) => {
    if(event.target.value.trim().length>0){
      setIsValid(true);
    }  
    setEnteredValue(event.target.value);
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div className="form-control">
        <label style={{ color: !isValid ? "red" : "black" }}>Course Goal</label>
        <input
          style={{
            borderColor: !isValid ? "red" : "#ccc",
            backgroundColor: !isValid ? "salmon" : "transparent",
          }}
          type="text"
          onChange={goalInputChangeHandler}
        />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};
export default CourseInput;

// TASK) On button click, if user has not entered anything make the button color dull and if the user starts entering make it back to normal
// button color changes based on isValid's state

// i) CourseInput.js code:
import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import "./CourseInput.css";
const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const goalInputChangeHandler = (event) => {
    if(event.target.value.trim().length>0){
      setIsValid(true);
    }  
      setEnteredValue(event.target.value);
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div className="form-control">
        <label style={{ color: !isValid ? "red" : "black" }}>Course Goal</label>
        <input
          style={{
            borderColor: !isValid ? "red" : "#ccc",
            backgroundColor: !isValid ? "salmon" : "transparent",
          }}
          type="text"
          onChange={goalInputChangeHandler}
        />
      </div>
      <Button style={{backgroundColor:!isValid?'rgba(139,0,93,0.65)':'rgba(139,0,93,1)'}} type="submit">Add Goal</Button>
    </form>
  );
};
export default CourseInput;

// ii) Button.js code: (to carry the styles from CourseInput component into Button component as button has its own component here)
import React from 'react';
import './Button.css';
const Button = props => {
  return (
    <button style={props.style} type={props.type} className="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
};
export default Button;