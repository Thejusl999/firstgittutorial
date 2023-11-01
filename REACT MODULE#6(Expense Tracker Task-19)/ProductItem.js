import { useDispatch, useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import {cartItemsActions} from '../../store/cartItems';

const ProductItem = (props) => {
  const { title, price, description } = props;
  const cartItems=useSelector(state=>state.cartItems.cartItemsArr);
  const dispatch=useDispatch();
  
  const cartItemsHandler=(title,price,description,quantity=1)=>{
    let flag=false;
    let ind;
    let quan;
    cartItems.map((item,index)=>{
      flag=title===item.title?true:false
      ind=index;
      quan=item.quantity;
    })
    if(flag){
      const updatedItem={...cartItems[ind],quantity:quan+1};
      // const newArray = [...cartItems];
      // newArray[ind] = updatedItem;
      dispatch(cartItemsActions.modifyCartItems(updatedItem));
    }else{
      dispatch(cartItemsActions.setCartItems({title,price,description,quantity}));
    }
  }
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={()=>cartItemsHandler(title,price,description)}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
