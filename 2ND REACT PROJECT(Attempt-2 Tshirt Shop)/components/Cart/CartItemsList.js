import React,{useContext} from 'react';
import classes from './CartItemsList.module.css';
import CartContext from '../../store/cart-context';
const CartItemsList=(props)=>{
  const cartCtx = useContext(CartContext);
  let total = 0;
  const addedItem = (
    <ul className={classes.li}>
      {cartCtx.Tshirts.map((Tshirt) => {
          return (
            <div key={Math.random()}>
              <div>
                <li>
                  <h3 className={classes.itemName}>
                    {Tshirt[Tshirt.length - 1].name}
                  </h3><br></br>
                  <p className={classes.quantityLabel}>
                    {Tshirt[Tshirt.length - 1].Lquan}L,{Tshirt[Tshirt.length - 1].Mquan}M,{Tshirt[Tshirt.length - 1].Squan}S
                  </p>
                  <h3 className={classes.itemPrice}>
                    ₹{Tshirt[Tshirt.length - 1].numQuantity*Tshirt[Tshirt.length - 1].price}
                  </h3>
                </li>
              </div>
              <hr></hr>
            </div>
          );
      })}
    </ul>
  );
  cartCtx.Tshirts.forEach((Tshirt) => {
    total += Tshirt[Tshirt.length - 1].numQuantity*Tshirt[Tshirt.length - 1].price
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
        <h3 className={classes.price}>₹{total}</h3>
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