import { createSlice } from "@reduxjs/toolkit";

const initialTodosState={pendingTodos:[],doneTodos:[],deletedTodos:[]};
const tasksSlice=createSlice({
    name:'tasks',
    initialState:initialTodosState,
    reducers:{
        clearAllTodos(state){
            state.pendingTodos=[];
        },
        setTodos(state,action){
            state.pendingTodos.push(action.payload);
        },
        setCompletedTodos(state,action){
            state.doneTodos.push(action.payload);
        },
        setDeletedTodos(state,action){
            state.deletedTodos.push(action.payload);
        }
    }
})

export const tasksActions=tasksSlice.actions;
export default tasksSlice.reducer;