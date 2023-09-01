import React, { useState } from 'react';
import CartContext from "./cart-context";
const CartProvider=props=>{
    const [Tshirts,setTshirts]=useState([]);
    const [total,setTotal]=useState(0);
    let flag=0;
    var t=0;
    const addTshirtHandler=(cartTshirt,quanNum,size)=>{
        Tshirts.forEach((Tshirt)=>{
            if(Tshirt[Tshirt.length-1].name===cartTshirt[0].name){
                flag=1;
                Tshirt[Tshirt.length-1].numQuantity=Tshirt[Tshirt.length-1].numQuantity+cartTshirt[0].numQuantity
                if(size==='L'){
                    Tshirt[Tshirt.length-1].Lquan++;
                }else if(size==='M'){
                    Tshirt[Tshirt.length-1].Mquan++;
                }else if(size==='S'){
                    Tshirt[Tshirt.length-1].Squan++;
                }
                setTshirts([...Tshirts,])
            }
        })
        if(!flag){
            setTshirts([...Tshirts,cartTshirt]);
        }
        t=total+Number(quanNum);
        setTotal(t)        
    };
    const cartContext={
        Tshirts:Tshirts,
        addTshirt:addTshirtHandler,
        totalQuantity:total
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}
export default CartProvider;