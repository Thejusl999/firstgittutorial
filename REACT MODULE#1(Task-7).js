// (1) APP.JS FILE CODE BELOW: (MAIN COMPONENT)

import TaskExpenseItems from "./components/TaskExpenseItems";
// import ExpenseItem from "./components/ExpenseItem";
function App() {
  return (
    <div>
      {/* <h2>Let's get started!</h2> */}
      {/* <ExpenseItem></ExpenseItem> */}
      <TaskExpenseItems></TaskExpenseItems>
    </div>
  );
}
export default App;

//****************************************************//

// (2) TASKEXPENSEITEMS.JS FILE CODE BELOW: (CUSTOM COMPONENT)

function TaskExpenseItems(){
    return (
        <div>
            <h2>Expense Items</h2>
            <h3>Food Rs 10</h3>
            <h3>Petrol Rs 100</h3>
            <h3>Movies Rs 200</h3>
        </div>
    );
}
export default TaskExpenseItems;