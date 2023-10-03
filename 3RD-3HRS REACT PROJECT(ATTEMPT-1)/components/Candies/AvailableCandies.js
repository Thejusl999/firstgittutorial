import React, { useContext,useEffect } from "react";
import CandyQuantity from "./CandyQuantity";
import classes from "./AvailableCandies.module.css";
import InputContext from "../../store/input-context";
const AvailableCandies = (props) => {
  const inputCtx=useContext(InputContext);
  useEffect(()=>inputCtx.inputUpdater(),[])
  if(inputCtx.items.length>0){
    return (
      <div className={classes.meals}>
        {inputCtx.items.map((candy) => (
          <div className={classes.eachMeal} key={Math.random()}>
            <h3 className={classes.name}>{candy.name}-{candy.description}-₹{candy.price}</h3>
            <CandyQuantity id={props.key}/>
          </div>
        ))}
      </div>
    );
  }
};
export default AvailableCandies;