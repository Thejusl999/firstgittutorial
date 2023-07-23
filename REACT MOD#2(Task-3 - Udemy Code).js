// FINAL CODE UPTILL TASK-3 (as done by Udemy Trainer. Also, CSS files for ExpenseForm and NewExpense were imported)
// 1) ExpenseForm.js code:
import React from 'react';
import './ExpenseForm.css';
const ExpenseForm=()=>{
  const changeHandler=(e)=>{
    console.log(e.target.value);
  }
  return (
    <form onChange={changeHandler}>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          <input type='text'/>
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          <input type='number' min='0.01' step='0.01'/>
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          <input type='date' min='2019-01-01' max='2022-12-31'/>
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  );
}
export default ExpenseForm;

// 2) NewExpense.js code:
import React from 'react';
import ExpenseForm from './ExpenseForm';
import './NewExpense.css';
const NewExpense=()=>{
    return (
        <div className='new-expense'>          
            <ExpenseForm/>
        </div>
    )
}
export default NewExpense;

// 3) App.js code:
import React from 'react';
import NewExpense from './components/NewExpense/NewExpense';
import Expenses from "./components/Expenses/Expenses";
const App=()=>{
  const expenses = [
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
      // location: "Domlur",
    },
    {
      id: "e2",
      title: "New TV",
      amount: 799.49,
      date: new Date(2021, 2, 12),
      // location: "Jayanagar",
    },
    {
      id: "e3",
      title: "Car Insurance",
      amount: 294.67,
      date: new Date(2021, 2, 28),
      // location: "Whitefield",
    },
    {
      id: "e4",
      title: "New Desk (Wooden)",
      amount: 450,
      date: new Date(2021, 5, 12),
      // location: "Brookefield",
    },
  ];
  return (
    <div>
      <NewExpense/>
      <Expenses items={expenses}/>
    </div>
  );
}
export default App;