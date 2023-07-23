// ADVANCE REACT - TASK-3 DELIVERABLES

// (i) Deliverable- Add ExpenseForm Component to take inputs
// 1) ExpenseForm.js code:
function ExpenseForm() {
    return (
      <form>
        <div>
          <label>Expense Title</label>
          <input type='text'/>
          <label>Expense Amount</label>
          <input type='number'/>
          <label>Expense Date</label>
          <input type='date'/>
        </div>
        <button type='submit'>Add Expense</button>
      </form>
    );
}
export default ExpenseForm;
// 2) App.js code:
import React from 'react';
import ExpenseForm from './components/Expenses/ExpenseForm';
import Expenses from "./components/Expenses/Expenses";
const App=()=>{
  const expenses = [
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
      location: "Domlur",
    },
    {
      id: "e2",
      title: "New TV",
      amount: 799.49,
      date: new Date(2021, 2, 12),
      location: "Jayanagar",
    },
    {
      id: "e3",
      title: "Car Insurance",
      amount: 294.67,
      date: new Date(2021, 2, 28),
      location: "Whitefield",
    },
    {
      id: "e4",
      title: "New Desk (Wooden)",
      amount: 450,
      date: new Date(2021, 5, 12),
      location: "Brookefield",
    },
  ];
  return (
    <div>
      <h2>Let's get started!</h2>
      <ExpenseForm/>
      <Expenses items={expenses}/>
    </div>
  );
}
export default App;

// (ii) Deliverable- Only when the form is visible on the screen try this
// Modified ExpenseForm.js code: (to display text typed in any input field of the form)
function ExpenseForm() {
    const changeHandler=(e)=>{console.log(e.target.value)};
    return (
      <form onChange={changeHandler}>
        <div>
          <label>Expense Title</label>
          <input type='text'/>
          <label>Expense Amount</label>
          <input type='number'/>
          <label>Expense Date</label>
          <input type='date'/>
        </div>
        <button type='submit'>Add Expense</button>
      </form>
    );
}
export default ExpenseForm;