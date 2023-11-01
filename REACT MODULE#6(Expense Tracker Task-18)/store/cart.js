import { createSlice } from "@reduxjs/toolkit";

const initialCartState={cartVisibility:false};
const cartSlice=createSlice({
    name:'cart',
    initialState:initialCartState,
    reducers:{
        showCart(state){
            state.cartVisibility=true;
        },
        hideCart(state){
            state.cartVisibility=false;
        }
    }
});

export const cartActions=cartSlice.actions;
export default cartSlice.reducer;