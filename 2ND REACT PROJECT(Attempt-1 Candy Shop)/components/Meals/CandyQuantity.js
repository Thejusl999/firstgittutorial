import React, { useContext } from "react";
import CartContext1 from "../../store/cart-context";
import classes from "./CandyQuantity.module.css";
const CandyQuantity = () => {
  const cartCtx=useContext(CartContext1);
  const submitHandler=(e)=>{
    e.preventDefault();
    let candyName=e.target.parentElement.parentElement.parentElement.firstChild.textContent.split('-')[0];
    let candyPrice=e.target.parentElement.parentElement.parentElement.firstChild.textContent.split('-')[2].substring(1);
    let quantity=Number(e.target.textContent.split(' ')[1])
    const cartCandy=[{
      name:candyName,
      quantity:quantity,
      price:candyPrice
    }]
    cartCtx.addCandy(cartCandy);
  }
  return (
    <div className={classes["form-div"]}>
      <form>
        <button className={classes.button} onClick={submitHandler}>Buy 1</button>
        <button className={classes.button} onClick={submitHandler}>Buy 2</button>
        <button className={classes.button} onClick={submitHandler}>Buy 3</button>
      </form>
    </div>
  );
};
export default CandyQuantity;
