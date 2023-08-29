import React, { useState } from 'react';
import InputContext from "./input-context";
const CartProvider=props=>{
    const [items,setItems]=useState([]);
    let flag=0;
    const addItemToCartHandler=(item,quantity)=>{
        items.forEach((cartItem)=>{
            if(cartItem[cartItem.length-1].name===item[0].name){
                flag=1;
                cartItem[cartItem.length-1].quantity=(Number(cartItem[cartItem.length-1].quantity)+quantity).toString()
                setItems([...items])
            }
        })
        if(!flag){
            setItems([...items,item]);
        }
    };
    const inputContext={
        items:items,
        addItem:addItemToCartHandler
    }
    return <InputContext.Provider value={inputContext}>
        {props.children}
    </InputContext.Provider>
}
export default CartProvider;