import React, { useState } from 'react';
import CartContext from "./cart-context";
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
    const removeItemToCartHandler=(dish)=>{
        items.forEach((cartItem)=>{
            if(cartItem[cartItem.length-1].name===dish){
                cartItem[cartItem.length-1].quantity=(Number(cartItem[cartItem.length-1].quantity)-1).toString()
                setItems([...items])
            }
        })
    };
    const add1ItemHandler=(dish)=>{
        items.forEach((cartItem)=>{
            if(cartItem[cartItem.length-1].name===dish){
                cartItem[cartItem.length-1].quantity=(Number(cartItem[cartItem.length-1].quantity)+1).toString()
                setItems([...items])
            }
        })
    };
    const cartContext={
        items:items,
        addItem:addItemToCartHandler,
        removeItem:removeItemToCartHandler,
        increaseQuantity:add1ItemHandler
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}
export default CartProvider;