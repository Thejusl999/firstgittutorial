import React from 'react';
import ExpenseDetails from "./ExpenseDetails";
import ExpenseDate from "./ExpenseDate";
import Card from '../UI/Card'
import './ExpenseItem.css';
const ExpenseItem=(props)=>{
  const clickHandler=(e)=>{e.target.parentElement.remove()};
  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <ExpenseDetails title={props.title} amount={props.amount} location={props.location}/>
      <button onClick={clickHandler}>Delete Expense</button>
    </Card>
  );
}
export default ExpenseItem;