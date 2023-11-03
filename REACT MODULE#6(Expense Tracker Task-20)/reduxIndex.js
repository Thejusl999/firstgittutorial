import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cart';
import cartItemsReducer from './cartItems';
import notificationsReducer from './notifications';

const store=configureStore({
    reducer:{cartModal:cartReducer,cartItems:cartItemsReducer,notifications:notificationsReducer}
});

export default store;