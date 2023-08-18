import React, { useContext, useRef } from "react";
import CartContext from "../../store/cart-context";
import classes from "./MealsFormInput.module.css";
const MealsFormInput = (props) => {
  const amount=useRef();
  const cartCtx=useContext(CartContext);
  const submitHandler=(e)=>{
    e.preventDefault();
    const quantity=amount.current.value
    const name=e.target.parentElement.parentElement.parentElement.children[0].textContent;
    const category=e.target.parentElement.parentElement.parentElement.children[1].textContent;
    const price=e.target.parentElement.parentElement.parentElement.children[2].textContent;
    const item=[{
      name:name,
      category:category,
      price:price,
      quantity:quantity
    }]
    cartCtx.addItem(item,Number(quantity));
    amount.current.value='';
  }
  return (
    <div className={classes["form-div"]}>
      <form>
        <label>Amount</label>
        <input
          id={'amount_'+props.id}
          className={classes["form-input"]}
          type='number'
          ref={amount}
          placeholder="1"
          min='1'
          max='5'
        />
        <br></br>
        <button className={classes.button} onClick={submitHandler}>+Add</button>
      </form>
      <hr></hr>
    </div>
  );
};
export default MealsFormInput;
