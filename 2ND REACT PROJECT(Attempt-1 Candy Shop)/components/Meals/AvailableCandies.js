import React, { useContext } from "react";
import CandyQuantity from "./CandyQuantity";
import classes from "./AvailableCandies.module.css";
import CartContext from "../../store/input-context";
const AvailableCandies = (props) => {
  const cartCtx=useContext(CartContext);
  if(cartCtx.items.length>0){
    return (
      <div className={classes.meals}>
        {cartCtx.items.map((candy) => (
          <div className={classes.eachMeal} key={Math.random()}>
            <h3 className={classes.name}>{candy[0].name}-{candy[0].description}-₹{candy[0].price}</h3>
            <CandyQuantity id={props.key}/>
          </div>
        ))}
      </div>
    );
  }
};
export default AvailableCandies;