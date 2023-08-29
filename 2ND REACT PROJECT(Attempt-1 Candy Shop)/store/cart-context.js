import React from 'react';
const CartContext=React.createContext({
    candies:[],
    addCandy:(candy)=>{}
});
export default CartContext;