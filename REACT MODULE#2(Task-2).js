// ADVANCE REACT - TASK-2 DELIVERABLES

// (i) Code: To Change Title by clicking the button
import React, {useState} from 'react';
import ExpenseDetails from "./ExpenseDetails";
import ExpenseDate from "./ExpenseDate";
import Card from '../UI/Card'
import './ExpenseItem.css';
const ExpenseItem=(props)=>{
  const [title,setTitle]=useState(props.title);
  const clickHandler=(e)=>{
    setTitle('Updated!');
  }
  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <ExpenseDetails title={title} amount={props.amount} location={props.location}/>
      <button onClick={clickHandler}>Change Title</button>
    </Card>
  );
}
export default ExpenseItem;

// (ii) Code: To Change Expense to $100 by clicking the button
import React, {useState} from 'react';
import ExpenseDetails from "./ExpenseDetails";
import ExpenseDate from "./ExpenseDate";
import Card from '../UI/Card'
import './ExpenseItem.css';
const ExpenseItem=(props)=>{
  const [expense, setExpense]=useState(props.amount);
  const clickHandler=(e)=>{
    setExpense(100);
  }
  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <ExpenseDetails title={props.title} amount={expense} location={props.location}/>
      <button onClick={clickHandler}>Change Expense</button>
    </Card>
  );
}
export default ExpenseItem;