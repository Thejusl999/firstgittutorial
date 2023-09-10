import React,{useContext} from 'react';
import {Row,Col,Button} from 'react-bootstrap';
import classes from './CartItemsList.module.css';
import CartContext from '../../store/cart-context';
const CartItemsList=(props)=>{
  const cartCtx=useContext(CartContext);
  const clickHandler=(e)=>{
    cartCtx.removeItem(e.target.parentElement.parentElement.parentElement.firstChild.lastChild.textContent);
  }
  const addedItem = (
    <ul className={classes.li}>
      {cartCtx.items.map((item) => {
        if(item.quantity>0){
          return (
            <div key={Math.random()}>
              <Row className={classes.cartItemsDiv}>
                <Col>
                    <img src={item.imageUrl} alt={item.title} className={classes.img}/>
                    <h6>{item.title}</h6>
                </Col>
                <Col>
                  <div className={classes.pricediv}>
                    <h5>{item.price*item.quantity}</h5>  
                  </div>
                </Col>
                <Col>
                  <div className={classes.quantityLabel}>
                    <Button variant="outline-primary">{item.quantity}</Button>{' '}
                    <Button variant="danger" onClick={clickHandler}>REMOVE</Button>{' '}
                  </div>
                </Col>
                <div className={classes.underline}></div>
              </Row>
            </div>
          );
        }
      })}
    </ul>
  );
  let total=0;
  cartCtx.items.map((item)=>{
    total+=(item.price*item.quantity);
  })
  return (
    <div className={classes.modal}>
      <div><h3 className={classes.text}>CART</h3></div>
      <Button className={classes.closeButton} variant="outline-secondary" onClick={props.onCloseClick}>X</Button>{' '}
      <Row className={classes.cartItemsDiv}>
        <Col><h4>ITEM</h4><div className={classes.underline}></div></Col>
        <Col><h4>PRICE</h4><div className={classes.underline}></div></Col>
        <Col><h4>QUANTITY</h4><div className={classes.underline}></div></Col>
      </Row>
      <h4 className={classes.header}>{addedItem}</h4>
      <h3 style={{textAlign:'right',marginTop:'-10px'}}>Total ${total}</h3>
      <Button variant="info" className={classes.orderButton}>PURCHASE</Button>{' '}
    </div>
  );
}
export default CartItemsList;