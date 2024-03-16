import {createSlice} from "@reduxjs/toolkit"

const INITITALSTATE={
    fullname:"",
    email:"",
    bio:"",
    expertise:"",
    experience:"",
    age:"",
    image:"",
    address:"",
    certificate:"",  
}

const mentoronboardSlice = createSlice(
    {
        name:"mentoronboard",
        initialState:{         
            value:INITITALSTATE
        },
        reducers:{
            changeFullname:(state,action)=>{
                state.value.fullname=action.payload
            },
            changeEmail:(state,action)=>{
                state.value.email=action.payload
            },
            changeBio:(state,action)=>{
                state.value.bio=action.payload
            },
            changeExpertise:(state,action)=>{
                state.value.expertise=action.payload
            },
            changeExperience:(state,action)=>{
                state.value.experience=action.payload
            },
            changeAge:(state,action)=>{
                state.value.age=action.payload
            },
            changeImage:(state,action)=>{
                state.value.image=action.payload
            },
            changeAddress:(state,action)=>{
                state.value.address=action.payload
            },
            changeCertificate:(state,action)=>{
                state.value.certificate=action.payload
            },   

            changeAvailabilityStartTime: (state, action) => {
                state.value.availability_start_time = action.payload;
              },
              changeAvailabilityEndTime: (state, action) => {
                state.value.availability_end_time = action.payload;
              },
        }        
    }
)

export const {changeFullname,changeEmail,changeBio,changeExpertise,changeExperience,changeAge,changeImage,changeAddress,changeCertificate,changeAvailabilityStartTime,changeAvailabilityEndTime} = mentoronboardSlice.actions
export default mentoronboardSlice.reducer