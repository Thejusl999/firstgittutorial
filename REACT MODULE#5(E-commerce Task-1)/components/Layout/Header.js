import React from "react";
import { Container, Navbar,Col } from "react-bootstrap";
import classes from "./Header.module.css";
const Header = () => {
  return (
    <>
      <Navbar bg="black" expand="sm" variant="dark" className={classes.nav}>
        <div className={classes.tabsdiv}>
          <Navbar.Brand className={classes.header1}>HOME</Navbar.Brand>
          <Navbar.Brand className={classes.header2}>STORE</Navbar.Brand>
          <Navbar.Brand className={classes.header3}>ABOUT</Navbar.Brand>
        </div>
        <div className={classes.cartdiv}>
          <button className={classes.button}>cart</button>
          <h5 className={classes.cartquan}>0</h5>
        </div>
      </Navbar>
      <Container className={classes.titlediv}>
        <Col>The Generics</Col>
      </Container>
    </>
  );
};
export default Header;
