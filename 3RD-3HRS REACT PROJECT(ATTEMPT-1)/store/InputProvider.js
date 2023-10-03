import React, { useState,useContext } from 'react';
import InputContext from "./input-context";
import CrudContext from "./crud-context";
const CartProvider=props=>{
    const crudCtx=useContext(CrudContext);
    let arr=[];
    let flag=0;
    const [items,setItems]=useState([]);
    const addItemToCartHandler=(item)=>{
        items.forEach((candy)=>{
            if(candy.name===item.name){
                flag=1;
            }
        })
        setItems(flag?[...items]:[...items,item])
    };
    const updateInputHandler=()=>{
        setTimeout(()=>{
            fetch(`${crudCtx.baseUrl}/products`)
            .then(response=>response.json())
            .then(data=>{
                data.map(item=>{
                    arr.push(item);
                    setItems(arr);
                })
            })
            .catch(err=>console.log(err))
        },0)
    }
    const inputContext={
        items:items,
        addItem:addItemToCartHandler,
        inputUpdater:updateInputHandler
    }
    return <InputContext.Provider value={inputContext}>
        {props.children}
    </InputContext.Provider>
}
export default CartProvider;