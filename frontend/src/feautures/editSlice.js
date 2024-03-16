import { createSlice } from "@reduxjs/toolkit"

const INITITALSTATE={
    username:"",
    name:"",
    email:"",
    phone:"",
    image:"",
    password:"",
}

const editUserSlice = createSlice(
    {
    name:"edituser",
    initialState:{
        value:INITITALSTATE
    
    },
    reducers:{
        setUsername:(state,action)=>{
            state.value.username=action.payload
        },
        setName:(state,action)=>{
            state.value.name=action.payload
        },
        setEmail:(state,action)=>{
            state.value.email=action.payload
        },
        setPhone:(state,action)=>{
            state.value.phone=action.payload
        },
        setImage:(state,action)=>{
            state.value.image=action.payload
        },
        setPassword:(state,action)=>{
            state.value.password=action.payload
        }
            
            
    }
})
export const {setUsername,setName,setEmail,setPhone,setImage,setPassword}= editUserSlice.actions
export default editUserSlice.reducer

