import React, { useState } from "react";
import TableList from "./components/Orders/TableList";
import Orders from "./components/Orders/Orders";
import "./App.css";

const App = () => {
  const [orders, setOrders] = useState([]);
  const addOrderHandler = (id, price, dish, table) => {
    localStorage.setItem(dish,JSON.stringify({dish: dish,table:table}));
    setOrders((prevOrders) => {
      return [
        ...prevOrders,
        { dishId: id, price: price, dish: dish, id: Math.random().toString(), table:table},
      ];
    });
    
  };
  const cancelOrderHandler=(dish)=>{
    localStorage.removeItem(dish);
  }
  const onDeleteHandler=(index)=>{
    const updatedOrders=[...orders];
    updatedOrders.splice(index,1);
    setOrders(updatedOrders);
  }

  return (
    <React.Fragment>
      <Orders onAddOrder={addOrderHandler} />
      <h2>Orders</h2>
      <TableList items={orders} onCancelOrder={cancelOrderHandler} onDelete={onDeleteHandler}/>
    </React.Fragment>
  );
};
export default App;
