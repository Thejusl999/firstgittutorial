import React from 'react';
import {Row,Col,Button} from 'react-bootstrap';
import classes from './CartItemsList.module.css';
const CartItemsList=(props)=>{
  const cartElements = [
    {
      title: 'Colors',
      price: 100,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
      quantity: 2,
    },
    {
      title: 'Black and white Colors',
      price: 50,
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
      quantity: 3,
    },
    {
      title: 'Yellow and Black Colors',
      price: 70,    
      imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
      quantity: 1,    
    }
  ]
  const addedItem = (
    <ul className={classes.li}>
      {cartElements.map((item) => {
          return (
            <div key={Math.random()}>
              <Row className={classes.cartItemsDiv}>
                <Col>
                    <img src={item.imageUrl} alt={item.title} className={classes.img}/>
                    <h6>{item.title}</h6>
                </Col>
                <Col>
                  <div className={classes.pricediv}>
                    <h5>{item.price.toFixed(2)}</h5>  
                  </div>
                </Col>
                <Col>
                  <div className={classes.quantityLabel}>
                    <Button variant="info">{item.quantity}</Button>{' '}
                    <Button variant="danger">REMOVE</Button>{' '}
                  </div>
                </Col>
                <div className={classes.underline}></div>
              </Row>
            </div>
          );
      })}
    </ul>
  );
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
      <Button variant="info" className={classes.orderButton}>PURCHASE</Button>{' '}
    </div>
  );
}
export default CartItemsList;