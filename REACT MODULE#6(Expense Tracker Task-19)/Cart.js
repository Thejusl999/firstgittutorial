import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const Cart = (props) => {
  const cartVisibility=useSelector(state=>state.cartModal.cartVisibility);
  const cartItemsNos=useSelector(state=>state.cartItems.cartItemsArr.length);
  return (
    <>
      {cartVisibility&&<Card className={classes.cart}>
        <h2>Your Shopping Cart</h2>
        <ul>
          {cartItemsNos>0?<CartItem/>:<h4 style={{textAlign:'center'}}>No Items in Cart!</h4>}
        </ul>
      </Card>}
    </>
  );
};

export default Cart;
