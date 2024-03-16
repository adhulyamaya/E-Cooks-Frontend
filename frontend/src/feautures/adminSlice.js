import { createSlice } from "@reduxjs/toolkit";

const INITITALSTATE={
    username:"",
    password:"",
}

const adminloginSlice = createSlice(
    {
    name:"adminlogin",
    initialState:{
        value:INITITALSTATE
    
    },
    reducers:{
        changeAdminname:(state,action)=>{
            state.value.username=action.payload
        },
        changeAdminPassword:(state,action)=>{
            state.value.password=action.payload
        }
            
    }
})
export const {changeAdminname,changeAdminPassword}= adminloginSlice.actions
export default adminloginSlice.reducer