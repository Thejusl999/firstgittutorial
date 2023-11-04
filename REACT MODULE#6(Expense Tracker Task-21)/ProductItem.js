import { useDispatch, useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import {cartItemsActions} from '../../store/cartItems';

const ProductItem = (props) => {
  const { title, price, description } = props;
  const cartItems=useSelector(state=>state.cartItems.cartItemsArr);
  const dispatch=useDispatch();
  
  const addToCartHandler=(title,price,description,quantity=1,totalPrice=price)=>{
    let flag=false;
    let ind,quan,priceI;
    cartItems.map((item,index)=>{
      if(title===item.title){
        flag=true;
        ind=index;
        quan=item.quantity;
        priceI=item.price;
      }
    })
    if(flag){
      quan+=1;
      const updatedItem={...cartItems[ind],quantity:quan,totalPrice:priceI*quan};
      const newArray = [...cartItems];
      newArray[ind] = updatedItem;
      dispatch(cartItemsActions.clearCartItems());
      newArray.map(eachIndex=>{
        dispatch(cartItemsActions.setCartItems(eachIndex));
      })
    }else{
      dispatch(cartItemsActions.setCartItems({title,price,description,quantity,totalPrice:price}));
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
          <button onClick={()=>addToCartHandler(title,price,description)}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
