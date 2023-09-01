import React from 'react';
const CartContext=React.createContext({
    Tshirts:[],
    addTshirt:(Tshirt)=>{}
});
export default CartContext;