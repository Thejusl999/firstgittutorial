import React, { useState,useContext } from 'react';
import CartContext from "./cart-context";
import CrudContext from "./crud-context";
const CartProvider=props=>{
    const crudCtx=useContext(CrudContext);
    let arr=[];
    const [candies,setCandies]=useState([]);
    let flag=0;
    const addCandyHandler=(cartCandy)=>{
        candies.forEach((candy)=>{
            if(candy.name===cartCandy.name){
                flag=1;
                candy.quantity=candy.quantity+cartCandy.quantity
                setCandies([...candies])
            }
        })
        if(!flag){
            setCandies([...candies,cartCandy]);
        }
    };
    const reduceQuantityHandler=(candyName)=>{
        candies.forEach((candy)=>{
            if(candy[candy.length-1].name===candyName){
                candy[candy.length-1].quantity=candy[candy.length-1].quantity-1
                setCandies([...candies])
            }
        })
    };
    const increaseQuantityHandler=(candyName)=>{
        candies.forEach((candy)=>{
            if(candy[candy.length-1].name===candyName){
                candy[candy.length-1].quantity=candy[candy.length-1].quantity+1
                setCandies([...candies])
            }
        })
    };
    const updateCartHandler=()=>{
        setTimeout(()=>{
          fetch(`${crudCtx.baseUrl}/carts`)
          .then(response=>response.json())
          .then(data=>{
            data.map(item=>{
              arr.push(item);
              setCandies(arr);
            })
          })
          .catch(err=>console.log(err))
        },0)
      }
    const cartContext={
        candies:candies,
        addCandy:addCandyHandler,
        cartUpdater:updateCartHandler
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}
export default CartProvider;