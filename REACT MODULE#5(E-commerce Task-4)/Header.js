import React,{useContext} from "react";
import {NavLink} from 'react-router-dom'; 
import { Container, Navbar,Nav,Col } from "react-bootstrap";
import classes from "./Header.module.css";
import CartContext from '../../store/cart-context';
const Header = (props) => {
  const cartCtx=useContext(CartContext);
  let cartQuan=0;
  cartCtx.items.forEach((item)=>{
    cartQuan+=Number(item.quantity);
  })
  return (
    <>
      <Navbar bg="black" expand="sm" variant="dark" className={classes.nav}>
        <Nav className={classes.tabsdiv}>
          <NavLink to="/home" className={({isActive})=>isActive?classes.active:classes.link}>HOME</NavLink>
          <NavLink to="/" className={({isActive})=>isActive?classes.active:classes.link} end>STORE</NavLink>
          <NavLink to="/about" className={({isActive})=>isActive?classes.active:classes.link}>ABOUT</NavLink>
        </Nav>
        <div className={classes.cartdiv}>
          <button className={classes.button} onClick={props.onShowCart}>cart</button>
          <h5 className={classes.cartquan}>{cartQuan}</h5>
        </div>
      </Navbar>
      <Container className={classes.titlediv}>
        <Col>The Generics</Col>
      </Container>
    </>
  );
};
export default Header;
