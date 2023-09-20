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
          <NavLink className={classes.link} activeClassName={classes.active} to="/home">HOME</NavLink>
          <NavLink className={classes.link} activeClassName={classes.active} to="/products">STORE</NavLink>
          <NavLink className={classes.link} activeClassName={classes.active} to="/about">ABOUT</NavLink>
          <NavLink className={classes.link} activeClassName={classes.active} to="/contact">CONTACT</NavLink>
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
