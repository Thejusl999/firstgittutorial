// ADVANCE REACT - TASK-4 DELIVERABLE

// Deliverable: Add 3 states for enteredTitle,enteredAmount,enteredDate to update it when user changes the title,amount,date respectively
// 1) ExpenseForm.js code:
import React,{useState} from 'react';
import './ExpenseForm.css';
const ExpenseForm=()=>{
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');
  const titleChangeHandler=(e)=>{setEnteredTitle(e.target.value)};
  const amountChangeHandler=(e)=>{setEnteredAmount(e.target.value)};
  const dateChangeHandler=(e)=>{setEnteredDate(e.target.value)};

  return (
    <form>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          <input type='text' placeholder={enteredTitle} onChange={titleChangeHandler}/>
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          <input type='number' min='0.01' step='0.01' placeholder={enteredAmount} onChange={amountChangeHandler}/>
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          <input type='date' min='2019-01-01' max='2022-12-31' placeholder={enteredDate} onChange={dateChangeHandler}/>
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  );
}
export default ExpenseForm;