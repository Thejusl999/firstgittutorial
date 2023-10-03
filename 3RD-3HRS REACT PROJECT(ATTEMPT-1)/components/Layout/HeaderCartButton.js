import React,{useContext,useEffect} from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from './HeaderCartButton.module.css';
const HeaderCartButton = (props) => {
  const cartCtx=useContext(CartContext);
  useEffect(()=>cartCtx.cartUpdater(),[])
  let candyQuan=0;
  cartCtx.candies.map((candy)=>{
    if(candy.quantity!==undefined)
      candyQuan+=candy.quantity
  })
  return (
    <button className={classes.button} onClick={props.onShowClick}>
      <span className={classes.icon}>
        <CartIcon/>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{candyQuan}</span>
    </button>
  );
};
export default HeaderCartButton;
