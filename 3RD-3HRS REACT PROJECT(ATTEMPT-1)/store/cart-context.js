import React from 'react';
const CartContext=React.createContext({
    candies:[],
    addCandy:(candy)=>{},
    quantityHandler:(quantity)=>{},
    totalQuantity:0,
    cartUpdater:()=>{}
});
export default CartContext;