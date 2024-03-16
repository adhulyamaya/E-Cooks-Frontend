import { createSlice } from "@reduxjs/toolkit"
const INITITALSTATE={
    classname:"",
    description:"",
    price:"",
    syllabus:"",  
      
}

const createClassSlice=createSlice(
    {
        name:"createclass",
        initialState:{
            value:INITITALSTATE
        },
        reducers:{
            setClassname:(state,action)=>{
                state.value.classname=action.payload
            },
            setDescription:(state,action)=>{
                state.value.description=action.payload
            },
            setPrice:(state,action)=>{
                state.value.price=action.payload
            },
            setSyllabus:(state,action)=>{
                state.value.syllabus=action.payload
            },
            

        }
    })

export const {setClassname,setDescription,setPrice,setSyllabus}   = createClassSlice.actions
export default createClassSlice.reducer