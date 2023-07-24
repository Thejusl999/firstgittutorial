// FINAL CODE UPTILL TASK-4,5 - as done by Udemy Trainer

import React,{useState} from "react";
import "./ExpenseForm.css";
const ExpenseForm=()=>{
  const [enteredTitle, setEnteredTitle] = useState('');    //TASK-4
  const [enteredAmount, setEnteredAmount] = useState('');  //TASK-4
  const [enteredDate, setEnteredDate] = useState('');      //TASK-4
  // const [userInput, setUserInput]=useState({enteredTitle: '',enteredAmount: '',enteredDate: ''}); //TASK-5(alt-1,2)
  
  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);                                                   //TASK-4
    // setUserInput({...userInput,enteredTitle:event.target.value});                       //TASK-5(alt-1)
    // setUserInput((prevState)=>{return{...prevState,enteredTitle:event.target.value}});  //TASK-5(alt-2)
  };
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);                                                   //TASK-4
    // setUserInput({...userInput,enteredAmount:event.target.value});                       //TASK-5(alt-1)
    // setUserInput((prevState)=>{return{...prevState,enteredAmount:event.target.value}});  //TASK-5(alt-2)
  };
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);                                                   //TASK-4
    // setUserInput({...userInput,enteredDate:event.target.value});                       //TASK-5(alt-1)
    // setUserInput((prevState)=>{return{...prevState,enteredDate:event.target.value}});  //TASK-5(alt-2)
  };

  return (
    <form>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};
export default ExpenseForm;
