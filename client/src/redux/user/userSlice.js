import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:null,
    loading:false,
};

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=> {
            state.loading=true;
        },
        signInSuccess:(state, action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=> {
            state.error=action.payload;
            state.loading=false;
        },
        updateUserStart:(state)=>{
            state.loading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        updateUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        deleteUserStart:(state,action)=>{
            state.loading=false;
        },
        deleteUserSuccess:(state,action)=>{
            state.currentUser=null;
            state.error=null;
            state.loading=false;
        },
        deleteUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        signOutUserStart:(state,action)=>{
            state.loading=false;
        },
        signOutUserSuccess:(state,action)=>{
            state.currentUser=null;
            state.error=null;
            state.loading=false;
        },
        signOutUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
    }
});

export const {signInStart,signInSuccess,signInFailure ,updateUserFailure,updateUserSuccess ,updateUserStart , deleteUserFailure , deleteUserStart ,deleteUserSuccess , signOutUserFailure,signOutUserStart,signOutUserSuccess}=userSlice.actions;

export default userSlice.reducer;