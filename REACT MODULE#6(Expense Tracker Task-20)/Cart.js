import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const Cart = (props) => {
  const cartVisibility=useSelector(state=>state.cartModal.cartVisibility);
  const cartItems=useSelector(state=>state.cartItems.cartItemsArr);
  const [indicator,setIndicator]=useState(false);
  let flag;
  useEffect(()=>{
    flag=false;
    cartItems.map(item=>{
      flag=item.quantity===0?true:false;
    })
    if(flag){
      setIndicator(flag)
    }else{
      setIndicator(false)
    }
  },[cartItems])
  return (
    <>
      {cartVisibility&&<Card className={classes.cart}>
        <h2>Your Shopping Cart</h2>
        <ul>
          {cartItems.length===0&&<h4 style={{textAlign:'center'}}>No Items in Cart!</h4>}
          {cartItems.length>0&&!indicator&&<CartItem/>}
          {cartItems.length>0&&indicator&&<h4 style={{textAlign:'center'}}>No Items in Cart!</h4>}
        </ul>
      </Card>}
    </>
  );
};

export default Cart;
