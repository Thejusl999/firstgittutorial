import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';
import {useSelector } from 'react-redux/es/hooks/useSelector';
import { cartItemsActions } from '../../store/cartItems';

const CartItem = (props) => {
  // const { title, quantity, total, price } = props.item;
  const cartItems=useSelector(state=>state.cartItems.cartItemsArr);
  const dispatch=useDispatch();

  const increaseHandler=(title,price,quan,totalP)=>{
    let ind;
    cartItems.map((item,index)=>{
      if(item.title===title){
        ind=index;
      }
    })
    const updatedItem={...cartItems[ind],quantity:quan+1,totalPrice:totalP+price};
    const newArray = [...cartItems];
    newArray[ind] = updatedItem;
    dispatch(cartItemsActions.clearCartItems());
    newArray.map(eachIndex=>{
      dispatch(cartItemsActions.modifyCartItems(eachIndex));
    })
  }

  const decreaseHandler=(title,price,quan,totalP)=>{
    let ind;
    cartItems.map((item,index)=>{
      if(item.title===title){
        ind=index;
      }
    })
    const updatedItem={...cartItems[ind],quantity:quan-1,totalPrice:totalP-price};
    const newArray = [...cartItems];
    newArray[ind] = updatedItem;
    dispatch(cartItemsActions.clearCartItems());
    newArray.map(eachIndex=>{
      dispatch(cartItemsActions.modifyCartItems(eachIndex));
    })
  }
  return (   
    <>{cartItems.map(item=>(
        <div key={Math.random()}>{item.quantity>0&&<li className={classes.item}>
          <header>
            <h3>{item.title}</h3>
            <div className={classes.price}>
              ${(item.totalPrice).toFixed(2)}{' '}
              <span className={classes.itemprice}>(${item.price.toFixed(2)}/item)</span>
            </div>
          </header>
          <div className={classes.details}>
            <div className={classes.quantity}>
              x <span>{item.quantity}</span>
            </div>
            <div className={classes.actions}>
              <button onClick={()=>decreaseHandler(item.title,item.price,item.quantity,item.totalPrice)}>-</button>
              <button onClick={()=>increaseHandler(item.title,item.price,item.quantity,item.totalPrice)}>+</button>
            </div>
          </div>
      </li>}</div>))}
    </>
  );
};

export default CartItem;
