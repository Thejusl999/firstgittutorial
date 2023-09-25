import React,{useContext} from "react";
import {NavLink,Link,useHistory} from 'react-router-dom'; 
import { Container, Navbar,Nav,Col } from "react-bootstrap";
import classes from "./Header.module.css";
import CartContext from '../../store/cart-context';
import AuthContext from "../../store/auth-context";
const Header = (props) => {
  const cartCtx=useContext(CartContext);
  let cartQuan=0;
  cartCtx.items.forEach((item)=>{
    cartQuan+=Number(item.quantity);
  })
  const authCtx=useContext(AuthContext);
  const history=useHistory();
  const logoutHandler=()=>{
      authCtx.logout();
      localStorage.clear();
      history.push('/');
  }
  return (
    <>
      <Navbar bg="black" expand="sm" variant="dark" className={classes.nav}>
        <Nav className={classes.tabsdiv}>
          <NavLink className={classes.link} activeClassName={classes.active} to="/home">HOME</NavLink>
          <NavLink className={classes.link} activeClassName={classes.active} to="/products">STORE</NavLink>
          <NavLink className={classes.link} activeClassName={classes.active} to="/about">ABOUT</NavLink>
          <NavLink className={classes.link} activeClassName={classes.active} to="/contact">CONTACT</NavLink>
        </Nav>
        {authCtx.isLoggedIn?
          (<button className={classes.link1} onClick={logoutHandler}>logout</button>):
          (<Link className={classes.link1} to="/">login</Link>)
        }
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
