import {createSlice} from "@reduxjs/toolkit"

const INITITALSTATE={
    name:"",
    password:"",
    mentorId: null,  
}

const mentorsignupSlice = createSlice(
    {
        name:"mentorsignup",
        initialState:{         
            value:INITITALSTATE
        },
        reducers:{
            changeName:(state,action)=>{
                state.value.name=action.payload
            },
            changePassword:(state,action)=>{
                state.value.password=action.payload
            },
            setMentorId: (state, action) => {
                state.value.mentorId = action.payload;
                console.log('Mentor ID updated in Redux state:', action.payload);
              },                            
        }        
    }
)

export const {changeName,changePassword,setMentorId} = mentorsignupSlice.actions
export default mentorsignupSlice.reducer