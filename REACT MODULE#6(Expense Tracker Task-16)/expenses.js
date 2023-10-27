import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState={expensesArray:[]}
const expensesSlice=createSlice({
    name:'expenses',
    initialState:initialExpenseState,
    reducers:{
        setExpenses(state,action) {
            state.expensesArray.push(action.payload);
        }
    }
});

export const expensesActions=expensesSlice.actions;
export default expensesSlice.reducer;