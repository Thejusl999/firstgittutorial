import React from "react";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from '../../assets/img.jpg';
import classes from './Header.module.css';
const Header = (props) => {
  return (
    <React.Fragment>
        <header className={classes.header}>
            <h1>The Candy Shop</h1>
            <HeaderCartButton onShowClick={props.onShowCart}/>    
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt='Candies!'/>
            <button>Your Cart </button><div>{0}</div>
        </div>
    </React.Fragment>
  );
};
export default Header;
