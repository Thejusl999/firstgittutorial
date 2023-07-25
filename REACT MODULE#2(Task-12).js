// ADVANCE REACT - TASK-12 DELIVERABLES
// 1) When the list has only a single Element, below that expense list show a message stating "Only single Expense here. Please add more..."
// 2) Incorporating better design patterns (moving the conditional rendering statements to another component i.e. ExpensesList)

// ExpensesList.js code:
import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";
const ExpensesList = (props) => {
  if (props.items.length === 1) {
    return (
      <div>
        <ul className="expenses-list">
          {props.items.map((expense) => (
            <ExpenseItem
              key={expense.id}
              title={expense.title}
              amount={expense.amount}
              date={expense.date}
              // location={expense.location}
            />
          ))}
        </ul>
        <h2 className="expenses-list__fallback">
          Only single Expense here. Please add more...
        </h2>
      </div>
    );
  } else if (props.items.length === 0){
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  }
  return (
    <ul className="expenses-list">
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
          // location={expense.location}
        />
      ))}
    </ul>
  );
};
export default ExpensesList;

// Modified Expenses.js code: (after adding ExpenseList component)
import React, { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./Expenses.css";
const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };
  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  /*3rd way of conditional rendering (best way - separating conditional logic and making the JSX code lean)
  let expensesFilterMsg=<p>No expenses found.</p>;
  if(filteredExpenses.length===1){
    expensesFilterMsg = filteredExpenses.map((expense) => (
      <div>
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
          // location={expense.location}
        />
        <p>Only single Expense here. Please add more...</p>
      </div>
    ));
  } else if(filteredExpenses.length>1) {
    expensesFilterMsg = filteredExpenses.map((expense) => (
      <ExpenseItem
        key={expense.id}
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
        // location={expense.location}
      />
    ));
  } */

  return (
    <Card className="expenses">
      <ExpenseFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      {/* 1-way of conditional rendering (using ternary operator inside JSX)
      {filteredExpenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        filteredExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
            // location={expense.location}
          />
        ))
      )} */}

      {/* 2nd-way of conditional rendering (using the && to execute code based on conditions)
      {filteredExpenses.length===0 && <p>No expenses found.</p>}
      {filteredExpenses.length>0 && 
        filteredExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
            // location={expense.location}
          />
        ))
      } */}

      {/* 3rd-way of conditional rendering & after moving conditional rendering statements to another component*/}
      <ExpensesList items={filteredExpenses}/>
    </Card>
  );
};
export default Expenses;