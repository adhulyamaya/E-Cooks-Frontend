import React, { useState } from 'react'
import {setUsername,setName,setEmail,setPhone,setImage,setPassword} from "../../feautures/createSlice";
import { useDispatch,useSelector } from 'react-redux';
import axiosInstance from '../../axios/axios';
import { useNavigate } from 'react-router-dom';

const Create =()=> {
    const dispatch=useDispatch();
    const navigate = useNavigate()
    const createuser = useSelector((state) => state.createuser);
    const creteuserSubmit = () => {
        const datas = {
            username: createuser.value.username,
            name: createuser.value.name,
            email: createuser.value.email,
            phone: createuser.value.phone,
            image: createuser.value.image,
            password: createuser.value.password,
        }
        console.log(datas, "ITHAN SANAM");
        axiosInstance.post('create-data/',datas)
        .then((res)=>{
            console.log(res.data,"????????");
            if(res.data.message){
                navigate('../admin-profile')
            }
        })
    }
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary text-white p-5'>
            <h1>ADD NEW USER</h1>
            <form>
                <div>
                    <label htmlFor="username">UserName:</label>
                    <input type="text" name='username' className='form-control' 
                    onChange={e =>dispatch(setUsername(e.target.value))}/>
                    
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name='name' className='form-control' 
                    onChange={(e) =>dispatch(setName(e.target.value))}/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name='email' className='form-control' 
                    onChange={(e) =>dispatch(setEmail(e.target.value))}/>
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input type="number" name='phone' className='form-control' 
                    onChange={(e) =>dispatch(setPhone(e.target.value))}/>
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input type="text" name='image' className='form-control' 
                    onChange={(e) =>dispatch(setImage(e.target.value))}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="text" name='password' className='form-control'
                    onChange={(e) =>dispatch(setPassword(e.target.value))} />
                </div>
            </form>
            <button className='btn btn-info' onClick={creteuserSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default Create;