import { createSlice } from "@reduxjs/toolkit";

const initialNotificationState={title:'',message:'',status:''};
const notificationSlice=createSlice({
    name:'notification',
    initialState:initialNotificationState,
    reducers:{
        setSending(state){
            state.title='Sending...';
            state.message='Sending cart data!';
            state.status='';
        },
        setSuccess(state){
            state.title='Success!';
            state.message='Sent cart data successfully!';
            state.status='success';
        },
        setError(state){
            state.title='Error!';
            state.message='Sending cart data failed!';
            state.status='error';
        }
    }
});

export const notificationActions=notificationSlice.actions;
export default notificationSlice.reducer;