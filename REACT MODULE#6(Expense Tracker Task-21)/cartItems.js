import { createSlice } from "@reduxjs/toolkit";
import { notificationActions } from "./notifications";

const initialCartItemsState={cartItemsArr:[]};
const cartItemsSlice=createSlice({
    name:'cartItems',
    initialState:initialCartItemsState,
    reducers:{
        setCartItems(state,action){
            state.cartItemsArr.push(action.payload);
        },
        clearCartItems(state){
            state.cartItemsArr=[];
        }
    }
});

export const sendCartData=(cartData)=>{
    return async (dispatch) =>{
        dispatch(notificationActions.setSending())

        const sendPostRequest=async ()=>{
            const response=await fetch('https://async-redux-app-default-rtdb.firebaseio.com/cartList.json',{
                method:'PUT',
                body:JSON.stringify(cartData),
                headers:{
                  'Content-Type':'application.json'
                } 
            });
            if(!response.ok)
                throw new Error('Network response was not ok');
            return response.json();
        }
        try{
            await sendPostRequest();
            dispatch(notificationActions.setSuccess())
        }catch(error){
            dispatch(notificationActions.setError())
        }
    }
};

export const fetchCartData=()=>{
    return async (dispatch) =>{
        dispatch(notificationActions.getFetching())

        let flag=false;
        const sendGetRequest=async ()=>{
            const response=await fetch('https://async-redux-app-default-rtdb.firebaseio.com/cartList.json');
            if(!response.ok)
                throw new Error('Network response was not ok');
            const data=await response.json();
            if(data!==null){
                flag=true;
                data.map(item=>{
                  dispatch(cartItemsActions.setCartItems(item));
                })
            }
        }
        try{
            await sendGetRequest();
            if(flag){
                dispatch(notificationActions.getSuccess())
            }else{
                dispatch(notificationActions.noData())
            }
        }catch(error){
            dispatch(notificationActions.getError())
        }
    }
};

export const cartItemsActions=cartItemsSlice.actions;
export default cartItemsSlice.reducer;