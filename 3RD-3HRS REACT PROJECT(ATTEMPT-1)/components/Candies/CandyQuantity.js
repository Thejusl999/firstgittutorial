import React, { useContext } from "react";
import CartContext1 from "../../store/cart-context";
import CrudContext from "../../store/crud-context";
import classes from "./CandyQuantity.module.css";
const CandyQuantity = () => {
  const cartCtx=useContext(CartContext1);
  const crudCtx=useContext(CrudContext);
  const postRequestHandler=(e)=>{
    let candyName=e.target.parentElement.parentElement.parentElement.firstChild.textContent.split('-')[0];
    let candyPrice=Number(e.target.parentElement.parentElement.parentElement.firstChild.textContent.split('-')[2].substring(1));
    let candyQuantity=Number(e.target.textContent.split(' ')[1]);
    let item={
      name:candyName,
      quantity:candyQuantity,
      price:candyPrice,
    }
    cartCtx.addCandy([item]);
    let fetchUrl=`${crudCtx.baseUrl}/carts`;
    fetch(fetchUrl,{
      method:'POST',
      body:JSON.stringify(item),
      headers:{
        'Content-Type':'application/json',
      }
    })
    cartCtx.cartUpdater();
  }
  const submitHandler=(e)=>{
    e.preventDefault();
    let candyName=e.target.parentElement.parentElement.parentElement.firstChild.textContent.split('-')[0];
    let candyPrice=Number(e.target.parentElement.parentElement.parentElement.firstChild.textContent.split('-')[2].substring(1));
    let candyQuantity=Number(e.target.textContent.split(' ')[1]);
    let item;
    fetch(`${crudCtx.baseUrl}/carts`)
    .then(res=>res.json())
    .then(data=>{
        if(data.length!==0){
          let flag=0;
          let productId='';
          data.map(product=>{
            if(product.name===candyName){
              flag=1;
              item={
                name: product.name,
                quantity:product.quantity+candyQuantity,
                price: product.price,
              }
              productId=product._id;
              cartCtx.addCandy([item]);
              cartCtx.cartUpdater();
            }
          })
          if(flag){
            fetch(`${crudCtx.baseUrl}/carts/${productId}`,{
                method:'PUT',
                body:JSON.stringify(item),
                headers:{'Content-Type':'application/json'},
            })
          }else{
            postRequestHandler(e);
          }
        }else{
            postRequestHandler(e);
        }
    })
  }

  return (
    <div className={classes["form-div"]}>
      <form>
        <button className={classes.button} onClick={submitHandler}>Buy 1</button>
        <button className={classes.button} onClick={submitHandler}>Buy 2</button>
        <button className={classes.button} onClick={submitHandler}>Buy 3</button>
      </form>
    </div>
  );
};
export default CandyQuantity;
