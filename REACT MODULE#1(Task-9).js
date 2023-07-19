// DELIVERABLE-1 : Can you pass LocationOfExpenditure as props and show it on the screen

// (1) App.js code:
import ExpenseItem from "./components/ExpenseItem";
function App() {
  const expenses = [
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
      location: "Domlur",
    },
    { id: "e2", 
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
      <ExpenseItem
        title={expenses[0].title}
        amount={expenses[0].amount}
        date={expenses[0].date}
        location={expenses[0].location}
      ></ExpenseItem>
      <ExpenseItem
        title={expenses[1].title}
        amount={expenses[1].amount}
        date={expenses[1].date}
        location={expenses[1].location}
      ></ExpenseItem>
      <ExpenseItem
        title={expenses[2].title}
        amount={expenses[2].amount}
        date={expenses[2].date}
        location={expenses[2].location}
      ></ExpenseItem>
      <ExpenseItem
        title={expenses[3].title}
        amount={expenses[3].amount}
        date={expenses[3].date}
        location={expenses[3].location}
      ></ExpenseItem>
    </div>
  );
}
export default App;

//(2) ExpenseItem.js code:
import './ExpenseItem.css';
function ExpenseItem(props){
    return (
        <div className="expense-item">
            <div>{props.date.toISOString()}</div>
            <div className="expense-item__description">
                <h2>{props.title}</h2>
                <div className="expense-item__price">${props.amount}</div>
            </div>
            <h3>{props.location}</h3>
        </div>
    );
}
export default ExpenseItem;

//  DELIVERABLE-2 :The udemy trainer is calling ExpenseItems Component 4 times to show 4 expenses. If you have 100 expenses you would have to write ExpenseItems Component 100 times. Can you do this via looping so that you dont have to manually write.

// Modified App.js code to loop through the array:
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
          ></ExpenseItem>
        ))}
    </div>
  );
}
export default App;