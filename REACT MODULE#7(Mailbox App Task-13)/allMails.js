import { createSlice } from "@reduxjs/toolkit";

const initialMailsState={emails:[]};
const mailsSlice=createSlice({
    name:'mails',
    initialState:initialMailsState,
    reducers:{
        pushMail(state,action){
            state.emails.push(action.payload)
        },
        clearMails(state){
            state.emails=[]
        }
    }
})

export const allMailsActions=mailsSlice.actions;
export default mailsSlice.reducer;