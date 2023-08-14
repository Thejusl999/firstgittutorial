import React from "react";
import './TableList.css';
const TableList = (props) => {
const deleteHandler=(dish,index)=>{
  props.onCancelOrder(dish);
  props.onDelete(index);
}

  const takenOrders=(tableNumber)=>{
    const requiredOrder=props.items.filter(item=>item.table===tableNumber);
    return(
      <ul>
        {requiredOrder.map((order,index)=>(
          <li className='user-li' key={index}>
            {order.price}-table{order.table}-{order.dish}
            <button onClick={()=>deleteHandler(order.dish,index)}>Delete Order</button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h4>Table 1</h4>
      {takenOrders('1')}
      <h4>Table 2</h4>
      {takenOrders('2')}
      <h4>Table 3</h4>
      {takenOrders('3')}
    </div>
  );
};
export default TableList;