// ** REACT-MODULE#01 - EXPENSE TRACKER USING REACT (FINAL CODE COMPONENTS)*UDEMY COURSE* //

// 1) App.js code:
import React from 'react';
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
  // return React.createElement(
  //   'div',
  //   {},
  //   React.createElement('h2', {}, "Let's get started!"),
  //   React.createElement(Expenses, {items:expenses})
  // );
  return (
    <div>
      <h2>Let's get started!</h2>
      <Expenses items={expenses}/>
    </div>
  );
}
export default App;

// 2) Expenses.js code:
import React from 'react';
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import './Expenses.css';
const Expenses=(props)=>{
    return (
        <Card className="expenses">
            {props.items.map((num,index)=>(
                <ExpenseItem
                    title={props.items[index].title}
                    amount={props.items[index].amount}
                    date={props.items[index].date}
                    location={props.items[index].location}
                />
            ))}
        </Card>
    );
}
export default Expenses;

// 3) ExpenseItem.js code:
import React from 'react';
import ExpenseDetails from "./ExpenseDetails";
import ExpenseDate from "./ExpenseDate";
import Card from '../UI/Card'
import './ExpenseItem.css';
const ExpenseItem=(props)=>{
  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <ExpenseDetails title={props.title} amount={props.amount} location={props.location}/>
    </Card>
  );
}
export default ExpenseItem;

// 4) ExpenseDate.js code:
import React from 'react';
import './ExpenseDate.css';
const ExpenseDate=(props)=>{
    const month=props.date.toLocaleString('en-US',{month:'long'});
    const day=props.date.toLocaleString('en-US',{day:'2-digit'});
    const year=props.date.getFullYear();
    return (
        <div className="expense-date">
            <div className="expense-month">{month}</div>
            <div className="expense-year">{year}</div>
            <div className="expense-day">{day}</div>
        </div>
    );
}
export default ExpenseDate;

// 5) ExpenseDetails.js code:
import React from 'react';
const ExpenseDetails=(props)=>{
  return (
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
        <h3>{props.location}</h3>
      </div>
  );
}
export default ExpenseDetails;

// 6) Card.js code:
import React from 'react';
import './Card.css'
const Card=(props)=>{
    const classes='card '+props.className;
    return <div className={classes}>{props.children}</div>;
}
export default Card;