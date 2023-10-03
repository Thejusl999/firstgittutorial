import React,{useContext,useEffect} from 'react';
import classes from './CartItemsList.module.css';
import CartContext from '../../store/cart-context';
const CartItemsList=(props)=>{
  const cartCtx = useContext(CartContext);
  useEffect(()=>cartCtx.cartUpdater(),[])
  let total = 0;
  const addedItem = (
    <ul className={classes.li}>
      {cartCtx.candies.map((candy) => {
        if (candy.quantity > 0) {
          return (
            <div key={Math.random()}>
              <div>
                <li>
                  <h3 className={classes.itemName}>
                    {candy.name}
                  </h3>
                  {<br></br>}
                  <p className={classes["price-p"]}>
                    ₹{candy.price}
                  </p>
                  <p className={classes.quantityLabel}>
                    x{candy.quantity}
                  </p>
                </li>
              </div>
              <hr></hr>
            </div>
          );
        }
      })}
    </ul>
  );
  cartCtx.candies.forEach((candy) => {
    total+=candy.price*candy.quantity;
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