import React, { useState } from 'react';
import CartContext from "./cart-context";
const CartProvider=props=>{
    const [candies,setCandies]=useState([]);
    let flag=0;
    const addCandyHandler=(cartCandy)=>{
        candies.forEach((candy)=>{
            if(candy[candy.length-1].name===cartCandy[0].name){
                flag=1;
                candy[candy.length-1].quantity=candy[candy.length-1].quantity+cartCandy[0].quantity
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
    const cartContext={
        candies:candies,
        addCandy:addCandyHandler,
        reduceQuantity:reduceQuantityHandler,
        increaseQuantity:increaseQuantityHandler,
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}
export default CartProvider;