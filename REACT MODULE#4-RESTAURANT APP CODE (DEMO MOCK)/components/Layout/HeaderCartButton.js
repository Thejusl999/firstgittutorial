import React,{useContext} from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from './HeaderCartButton.module.css';
const HeaderCartButton = (props) => {
  const cartCtx=useContext(CartContext);
  let itemQuan=0;
  cartCtx.items.forEach((item)=>{
    item.forEach((dish)=>{
      itemQuan+=Number(dish.quantity)
    })
  })
  return (
    <button className={classes.button} onClick={props.onShowClick}>
      <span className={classes.icon}>
        <CartIcon/>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{itemQuan}</span>
    </button>
  );
};
export default HeaderCartButton;
