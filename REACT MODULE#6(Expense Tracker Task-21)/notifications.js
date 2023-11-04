import { createSlice } from "@reduxjs/toolkit";

const initialNotificationState={sendNotification:{title:'',message:'',status:''},fetchNotification:{title:'',message:'',status:''}};
const notificationSlice=createSlice({
    name:'notification',
    initialState:initialNotificationState,
    reducers:{
        setSending(state){
            state.sendNotification.title='Sending...';
            state.sendNotification.message='Sending cart data!';
            state.sendNotification.status='';
            state.fetchNotification={title:'',message:'',status:''};
        },
        setSuccess(state){
            state.sendNotification.title='Success!';
            state.sendNotification.message='Sent cart data successfully!';
            state.sendNotification.status='success';
            state.fetchNotification={title:'',message:'',status:''};
        },
        setError(state){
            state.sendNotification.title='Error!';
            state.sendNotification.message='Sending cart data failed!';
            state.sendNotification.status='error';
            state.fetchNotification={title:'',message:'',status:''};
        },
        getFetching(state){
            state.fetchNotification.title='Fetching...';
            state.fetchNotification.message='Fetching cart data!';
            state.fetchNotification.status='';
            state.sendNotification={title:'',message:'',status:''};
        },
        noData(state){
            state.fetchNotification.title='Sorry!';
            state.fetchNotification.message='Cart Empty! Add items to Cart!';
            state.fetchNotification.status='';
            state.sendNotification={title:'',message:'',status:''};
        },
        getSuccess(state){
            state.fetchNotification.title='Success!';
            state.fetchNotification.message='Fetched cart data successfully!';
            state.fetchNotification.status='success';
            state.sendNotification={title:'',message:'',status:''};
        },
        getError(state){
            state.fetchNotification.title='Error!';
            state.fetchNotification.message='Fetching cart data failed!';
            state.fetchNotification.status='error';
            state.sendNotification={title:'',message:'',status:''};
        },
    }
});

export const notificationActions=notificationSlice.actions;
export default notificationSlice.reducer;