import classes from './CartButton.module.css';
import {cartActions} from '../../store/cart';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const CartButton = (props) => {
  const dispatch=useDispatch();
  const [cartShown,setCartShown]=useState(false);
  const cartButtonHandler=()=>{
    if(!cartShown){
      dispatch(cartActions.showCart());
      setCartShown(true);
    }else{
      dispatch(cartActions.hideCart());
      setCartShown(false);
    }
    
  }
  return (
    <button className={classes.button} onClick={cartButtonHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
