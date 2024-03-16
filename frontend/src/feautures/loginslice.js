import {createSlice} from "@reduxjs/toolkit"

const INITITALSTATE={
    username:"",
    password:"",  
}
const customerloginSlice = createSlice(
    {
        name:"customerlogin", 
        initialState:{
            value:INITITALSTATE
        },
        reducers:{
            changeUsername:(state,action)=>{
                state.value.username=action.payload
            },
            changePassword:(state,action)=>{
                state.value.password=action.payload
            },        
        }        
    }
)
export const {changeUsername,changePassword} = customerloginSlice.actions
export default customerloginSlice.reducer



// if iam using zustand  it will be like this

// Zustand:
// gained popularity for its simplicity, ease of use, and suitability for smaller to medium-sized applications.
// Well-suited for managing state within a specific component or a few related components.
// Redux:
// Suitable for larger applications with complex state management needs.
// Provides a global state that can be accessed across components.
// Works well with middleware, making it extensible for various scenarios.

// import create from 'zustand';
// const customerLoginStore = create((set) => ({
//   username: '',
//   password: '',
//   error: null,

//   changeUsername: (newUsername) => set({ username: newUsername }),
//   changePassword: (newPassword) => set({ password: newPassword }),
//   setError: (newError) => set({ error: newError }),
// }));
// export default customerLoginStore;
