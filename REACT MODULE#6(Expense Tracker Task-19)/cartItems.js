import { createSlice } from "@reduxjs/toolkit";

const initialCartItemsState={cartItemsArr:[]};
const cartItemsSlice=createSlice({
    name:'cartItems',
    initialState:initialCartItemsState,
    reducers:{
        setCartItems(state,action){
            state.cartItemsArr.push(action.payload);
        },
        modifyCartItems(state,action){
            state.cartItemsArr=[];
            state.cartItemsArr.push(action.payload);
        }
    }
});

export const cartItemsActions=cartItemsSlice.actions;
export default cartItemsSlice.reducer;