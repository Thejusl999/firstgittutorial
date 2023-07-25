// ADVANCE REACT - TASK-10 DELIVERABLES
// 1) Using map() to make app dynamic,
// 2) Using useState in App.js component to add new item onto the expenses list and the UI,
// 3) Using keys for performance enhacement

// 1) Modified Expenses.js code: (map() and keys incorporated)
import React,{useState} from 'react';
import ExpenseFilter from './ExpenseFilter';
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import './Expenses.css';
const Expenses=(props)=>{
    const [filteredYear, setFilteredYear]=useState('2020');
    const filterChangeHandler=selectedYear=>{
        setFilteredYear(selectedYear);
    }
    return (
        <Card className="expenses">
            <ExpenseFilter selected={filteredYear} onChangeFilter={filterChangeHandler}/>
            {props.items.map((expense)=>(
                <ExpenseItem
                    key={expense.id}
                    title={expense.title}
                    amount={expense.amount}
                    date={expense.date}
                    // location={expense.location}
                />
            ))}
        </Card>
    );
}
export default Expenses;

// 2) Modified App.js code: (useState incorporated)
import React, {useState} from 'react';
import NewExpense from './components/NewExpense/NewExpense';
import Expenses from "./components/Expenses/Expenses";
const DUMMY_EXPENSES=[
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
const App=()=>{
  const [expenses, setExpenses]=useState(DUMMY_EXPENSES);
const addExpenseHandler=expense=>{
    setExpenses((prevExpenses)=>{
      return [expense, ...prevExpenses];
    });
  };
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler}/>
      <Expenses items={expenses}/>
    </div>
  );
}
export default App;