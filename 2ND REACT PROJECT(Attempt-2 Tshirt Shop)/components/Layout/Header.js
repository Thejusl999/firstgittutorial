import React from "react";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from '../../assets/img.jpg';
import classes from './Header.module.css';
const Header = (props) => {
  return (
    <React.Fragment>
        <header className={classes.header}>
            <h1>Shoppers Stop for T-shirts</h1>
            <HeaderCartButton onShowClick={props.onShowCart}/>    
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt='T-shirts!'/>
            <button>Your Cart </button><div>{0}</div>
        </div>
    </React.Fragment>
  );
};
export default Header;
