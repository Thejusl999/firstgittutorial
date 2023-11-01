import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cart';
import cartItemsReducer from './cartItems';

const store=configureStore({
    reducer:{cartModal:cartReducer,cartItems:cartItemsReducer}
});

export default store;