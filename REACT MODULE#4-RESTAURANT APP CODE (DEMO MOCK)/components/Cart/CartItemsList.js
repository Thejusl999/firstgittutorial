import React,{useContext} from 'react';
import classes from './CartItemsList.module.css';
import CartContext from '../../store/cart-context';
const CartItemsList=(props)=>{
  const cartCtx = useContext(CartContext);
  let total = 0;
  const removeHandler = (e) => {
    cartCtx.removeItem(e.target.parentElement.parentElement.firstChild.lastChild.firstChild.textContent);
  };
  const increaseQuantityHandler = (e) => {
    cartCtx.increaseQuantity(e.target.parentElement.parentElement.firstChild.lastChild.firstChild.textContent);
  };
  const addedItem = (
    <ul className={classes.li}>
      {cartCtx.items.map((item) => {
        if (item[item.length - 1].quantity > 0) {
          return (
            <div key={Math.random()}>
              <div>
                <li>
                  <h3 className={classes.itemName}>
                    {item[item.length - 1].name}
                  </h3>
                  {<br></br>}
                  <p className={classes["price-p"]}>
                    {item[item.length - 1].price}
                  </p>
                  <p className={classes.quantityLabel}>
                    x{item[item.length - 1].quantity}
                  </p>
                </li>
              </div>
              <div className={classes.buttonDiv}>
                <button className={classes.buttons} onClick={removeHandler}>
                  -
                </button>
                <button className={classes.buttons} onClick={increaseQuantityHandler}>+</button>
              </div>
              <hr></hr>
            </div>
          );
        }
      })}
    </ul>
  );
  cartCtx.items.forEach((item) => {
    total +=
      Number(item[item.length - 1].price.substring(1)) *
      Number(item[item.length - 1].quantity);
  });
  const orderHandler=()=>{
    alert('Your Order has been placed!\nThank You, Visit again')
  }
  return (
    <div className={classes.modal}>
      <h4 className={classes.header}>{addedItem}</h4>
      <div>
        <h3 className={classes.text}>Total Amount</h3>
        <h3 className={classes.price}>${total.toFixed(2)}</h3>
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