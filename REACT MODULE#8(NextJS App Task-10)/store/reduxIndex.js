import { configureStore } from "@reduxjs/toolkit";
import todosReducer from './allTodos' 

const store=configureStore({
    reducer:{allTodos:todosReducer}
})

export default store;