import React, { useContext} from "react";
import classes from "./TshirtList.module.css";
import InputContext from "../../store/input-context";
import CartContext from "../../store/cart-context";
const TshirtList = () => {
  const inputCtx=useContext(InputContext);
  const cartCtx=useContext(CartContext);
  const submitHandler=(e)=>{
    e.preventDefault();
    let quan=e.target.textContent;
    if(quan.substring(quan.length-2,quan.length-1)>0){
      let TshirtName=e.target.parentElement.parentElement.firstChild.textContent.split('-')[0];
      let TshirtPrice=e.target.parentElement.parentElement.firstChild.textContent.split('-')[2].substring(1);
      let quantity='1'.concat(quan.substring(4,5))
      let quanNum=quantity.substring(0,quantity.length-1);
      let cartTshirt=[{
        name:TshirtName,
        price:TshirtPrice,
        numQuantity:Number(quanNum)
      }]
      if(quantity[1]==='L'){
        cartTshirt[cartTshirt.length-1]={...cartTshirt[0],Lquan:1,Mquan:0,Squan:0}
      }else if(quantity[1]==='M'){
        cartTshirt[cartTshirt.length-1]={...cartTshirt[0],Lquan:0,Mquan:1,Squan:0}
      }else if(quantity[1]==='S'){
        cartTshirt[cartTshirt.length-1]={...cartTshirt[0],Lquan:0,Mquan:0,Squan:1}
      }
      cartCtx.addTshirt(cartTshirt,quanNum,quantity[1]);
      inputCtx.items.map((shirt)=>{
        if(shirt[0].name===TshirtName){
          if(e.target.id==='large'){
            shirt[0].Lquantity-=1;
          }else if(e.target.id==='medium'){
            shirt[0].Mquantity-=1;
          }else{
            shirt[0].Squantity-=1;
          }
        }
      })
    }
  }

  if(inputCtx.items.length>0){
    return (
      <div className={classes.meals}>
        {inputCtx.items.map((candy) => (
          <div className={classes.eachMeal} key={Math.random()}>
            <h3 className={classes.name}>{candy[0].name}<br></br>-{candy[0].description}<br></br>-₹{candy[0].price}</h3>
            <form className={classes["button-div"]}>
              <button className={classes.button} onClick={submitHandler} id='large'>Buy Large ({candy[0].Lquantity})</button><br></br>
              <button className={classes.button} onClick={submitHandler} id='medium'>Buy Medium ({candy[0].Mquantity})</button><br></br>
              <button className={classes.button} onClick={submitHandler} id='small'>Buy Small ({candy[0].Squantity})</button><br></br>
            </form>
            <hr></hr>
          </div>
        ))}        
      </div>
    );
  }
};
export default TshirtList;