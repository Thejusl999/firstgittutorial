import classes from './CartButton.module.css';
import {cartActions} from '../../store/cart';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const CartButton = (props) => {
  const dispatch=useDispatch();
  const [cartShown,setCartShown]=useState(false);
  const cartItems=useSelector(state=>state.cartItems.cartItemsArr);
  let totalQuantity=0;
  const cartButtonHandler=()=>{
    if(!cartShown){
      dispatch(cartActions.showCart());
      setCartShown(true);
    }else{
      dispatch(cartActions.hideCart());
      setCartShown(false);
    }
    
  }
  cartItems.map(item=>{
    totalQuantity+=item.quantity
  })
  return (
    <button className={classes.button} onClick={cartButtonHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
