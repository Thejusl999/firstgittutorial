import React, {useRef} from "react";
import Card from "../UI/Card";
import './Orders.css';
const Orders = (props) => {
  const idInputRef = useRef();
  const priceInputRef = useRef();
  const dishInputRef = useRef();
  const chosenTableRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredId=idInputRef.current.value;
    const enteredPrice=priceInputRef.current.value;
    const enteredDish=dishInputRef.current.value;
    const chosenTable=chosenTableRef.current.value.split(' ')[1];
    if(enteredId.length===0||enteredPrice===0||enteredDish.length===0){
      alert("Enter all fields!")
      return;
    }
    props.onAddOrder(enteredId,enteredPrice,enteredDish,chosenTable); 
    idInputRef.current.value="";
    priceInputRef.current.value="";
    dishInputRef.current.value="";
  };
  return (
    <Card>
      <form onSubmit={submitHandler}>
        <div className="form-controls">
          <label>Unique Order ID:</label>
          <input
            className="form-inputs"
            type="number"
            ref={idInputRef}
          />
        </div>
        <div className="form-controls">
          <label>Choose Price:</label>
          <input
            className="form-inputs"
            type="number"
            ref={priceInputRef}
          />
        </div>
        <div className="form-controls">
          <label>Choose Dish:</label>
          <input
            className="form-inputs"
            type="text"
            ref={dishInputRef}
          />
        </div>
        <div className="form-controls">
          <label>Choose a Table:</label>
          <select className='form-select' placeholder='Table 1' ref={chosenTableRef}>
            <option value='Table 1'>Table 1</option>
            <option value='Table 2'>Table 2</option>
            <option value='Table 3'>Table 3</option>
          </select>
        </div>
        <button className="form-actions" type="submit">Add to bill</button>
      </form>
    </Card>
  );
};
export default Orders;
