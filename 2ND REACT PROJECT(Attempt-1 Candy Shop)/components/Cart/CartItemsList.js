import React,{useContext} from 'react';
import classes from './CartItemsList.module.css';
import CartContext from '../../store/cart-context';
const CartItemsList=(props)=>{
  const cartCtx = useContext(CartContext);
  let total = 0;
  const reduceHandler = (e) => {
    cartCtx.reduceQuantity(e.target.parentElement.parentElement.firstChild.firstChild.firstChild.textContent);
  };
  const increaseHandler = (e) => {
    cartCtx.increaseQuantity(e.target.parentElement.parentElement.firstChild.firstChild.firstChild.textContent);
  };
  const addedItem = (
    <ul className={classes.li}>
      {cartCtx.candies.map((candy) => {
        if (candy[candy.length - 1].quantity > 0) {
          return (
            <div key={Math.random()}>
              <div>
                <li>
                  <h3 className={classes.itemName}>
                    {candy[candy.length - 1].name}
                  </h3>
                  {<br></br>}
                  <p className={classes["price-p"]}>
                    ₹{candy[candy.length - 1].price}
                  </p>
                  <p className={classes.quantityLabel}>
                    x{candy[candy.length - 1].quantity}
                  </p>
                </li>
              </div>
              <div className={classes.buttonDiv}>
                <button className={classes.buttons} onClick={reduceHandler}>-</button>
                <button className={classes.buttons} onClick={increaseHandler}>+</button>
              </div>
              <hr></hr>
            </div>
          );
        }
      })}
    </ul>
  );
  cartCtx.candies.forEach((candy) => {
    total +=
      Number(candy[candy.length - 1].price) *
      Number(candy[candy.length - 1].quantity);
  });
  const orderHandler=()=>{
    alert('Your Order has been placed!\nThank You, Visit again');
    window.location.reload();
  }
  return (
    <div className={classes.modal}>
      <h4 className={classes.header}>{addedItem}</h4>
      <div>
        <h3 className={classes.text}>Total Amount</h3>
        <h3 className={classes.price}>₹{total.toFixed(2)}</h3>
      </div>
      <div className={classes["button-div"]}>
        <button className={classes.closeButton} onClick={props.onCloseClick}>
          Close
        </button>
        <button className={classes.orderButton} onClick={orderHandler}>Order</button>
      </div>
    </div>
  );
}
export default CartItemsList;