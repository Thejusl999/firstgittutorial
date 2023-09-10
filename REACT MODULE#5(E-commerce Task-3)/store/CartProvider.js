import React, { useState } from 'react';
import CartContext from "./cart-context";
const CartProvider=props=>{
    const [items,setItems]=useState([
        {
          title: 'Colors',
          price: 100,
          imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
          quantity: 2,
        },
        {
          title: 'Black and white Colors',
          price: 50,
          imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
          quantity: 3,
        },
        {
          title: 'Yellow and Black Colors',
          price: 70,    
          imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
          quantity: 1,    
        }
    ]);
    let flag=0;
    const addItemToCartHandler=(item)=>{
        items.forEach((cartItem)=>{
            if(cartItem.title===item[0].title){
                flag=1;
                cartItem.quantity=(Number(cartItem.quantity)+1).toString()
                setItems([...items])
            }
        })
        if(!flag)
            setItems([...items,...item]);
    };
    const removeItemToCartHandler=(item)=>{
        items.forEach((cartItem)=>{
            if(cartItem.title===item){
                cartItem.quantity=(Number(cartItem.quantity)-1).toString()
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
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}
export default CartProvider;