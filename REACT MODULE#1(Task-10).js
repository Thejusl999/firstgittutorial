// TASK-1: Watch video 14 from the following link and understand how to manipulate props and show them on the screen. Write down the code.

// (1) App.js code:
import ExpenseItem from "./components/ExpenseItem";
function App() {
  const expenses = [
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
      // location: "Domlur"
    },
    { id: "e2", 
      title: "New TV", 
      amount: 799.49,
      date: new Date(2021, 2, 12),
      // location: "Jayanagar"
    },
    {
      id: "e3",
      title: "Car Insurance",
      amount: 294.67,
      date: new Date(2021, 2, 28),
      // location: "Whitefield"
    },
    {
      id: "e4",
      title: "New Desk (Wooden)",
      amount: 450,
      date: new Date(2021, 5, 12),
      // location: "Brookefield"
    }
  ];
  return (
    <div>
      <h2>Let's get started!</h2>
        {expenses.map((num,index)=>(
          <ExpenseItem
            title={expenses[index].title}
            amount={expenses[index].amount}
            date={expenses[index].date}
            // location={expenses[index].location}
          ></ExpenseItem>
        ))}
    </div>
  );
}
export default App;

// (2) ExpenseItem.js code:
import './ExpenseItem.css';
function ExpenseItem(props){
    const month=props.date.toLocaleString('en-US',{month:'long'});
    const day=props.date.toLocaleString('en-US',{day:'2-digit'});
    const year=props.date.getFullYear();
    return (
        <div className="expense-item">
            <div>
                <div>{month}</div>
                <div>{year}</div>
                <div>{day}</div>
            </div>
            <div className="expense-item__description">
                <h2>{props.title}</h2>
                <div className="expense-item__price">${props.amount}</div>
            </div>
            {/* <h3>{props.location}</h3> */}
        </div>
    );
}
export default ExpenseItem;

//************************************************************

// TASK-2: Watch video 15 from above link to understand how to make your code more readable and smaller.(splitting the components)
// Code with splitted components was written along with the udemy trainer and checked. Code is as below:
// (1) ExpenseItem.js code:
import ExpenseDate from './ExpenseDate';
import './ExpenseItem.css';
function ExpenseItem(props){
    return (
        <div className="expense-item">
            <ExpenseDate date={props.date}/>
            <div className="expense-item__description">
                <h2>{props.title}</h2>
                <div className="expense-item__price">${props.amount}</div>
            </div>
            {/* <h3>{props.location}</h3> */}
        </div>
    );
}
export default ExpenseItem;

// (2) ExpenseDate.js code:
function ExpenseDate(props) {
  const month=props.date.toLocaleString('en-US',{month:'long'});
  const day=props.date.toLocaleString('en-US',{day:'2-digit'});
  const year=props.date.getFullYear();
  return (
      <div>
          <div>{month}</div>
          <div>{year}</div>
          <div>{day}</div>
      </div>
  );
}
export default ExpenseDate;

// DELIVERABLE-1: You just created Expense date seeing the udemy trainer. Can you also create a component called ExpenseDetails which has the title and the amount of Expenses 
// (1) App.js code:(incl. location component)
import ExpenseItem from "./components/ExpenseItem";
function App() {
  const expenses = [
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
      location: "Domlur"
    },
    { id: "e2", 
      title: "New TV", 
      amount: 799.49,
      date: new Date(2021, 2, 12),
      location: "Jayanagar"
    },
    {
      id: "e3",
      title: "Car Insurance",
      amount: 294.67,
      date: new Date(2021, 2, 28),
      location: "Whitefield"
    },
    {
      id: "e4",
      title: "New Desk (Wooden)",
      amount: 450,
      date: new Date(2021, 5, 12),
      location: "Brookefield"
    }
  ];
  return (
    <div>
      <h2>Let's get started!</h2>
        {expenses.map((num,index)=>(
          <ExpenseItem
            title={expenses[index].title}
            amount={expenses[index].amount}
            date={expenses[index].date}
            location={expenses[index].location}
          />
        ))}
    </div>
  );
}
export default App;

// (2) Modified ExpenseItem.js code:
import ExpenseDetails from "./ExpenseDetails";
import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";
function ExpenseItem(props) {
  return (
    <div className="expense-item">
      <ExpenseDate date={props.date} />
      <ExpenseDetails title={props.title} amount={props.amount} location={props.location}/>
    </div>
  );
}
export default ExpenseItem;

// (3) ExpenseDate.js code: (modified for styling with ExpenseDate.css)
import './ExpenseDate.css';
function ExpenseDate(props) {
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

// (4) ExpenseDetails.js code:
function ExpenseDetails(props) {
  return (
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
        <h3>{props.location}</h3>
      </div>
  );
}
export default ExpenseDetails;