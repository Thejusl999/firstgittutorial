// import {createStore} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import authReducer from './auth';
import expensesReducer from './expenses';
import themeReducer from './theme';

/* //OPTION-1: Core Methodology
const counterReducer=(state=initialState,action)=>{
    if(action.type==='increment'){
        return {
            counter:state.counter+1,
            showCounter:state.showCounter
        };
    }
    if(action.type==='decrement'){
        return {
            counter:state.counter-1,
            showCounter:state.showCounter
        };
    }
    if(action.type==='increase'){
        return {counter:state.counter+action.amount};
    }
    if(action.type==='decrease'){
        return {counter:state.counter-action.amount};
    }
    if(action.type==='toggle'){
        return {
            showCounter:!state.showCounter,
            counter:state.counter
        };
    }
    return state;
} */
// const store=createStore(counterReducer);

const store=configureStore({
    reducer:{counter:counterReducer,auth:authReducer,expenses:expensesReducer,theme:themeReducer}
});

export default store;