import React, { useEffect, useState } from 'react'
import {setUsername,setName,setEmail,setPhone,setImage,setPassword} from "../../feautures/editSlice";
import { useDispatch,useSelector } from 'react-redux';
import axiosInstance from '../../axios/axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
    const dispatch=useDispatch();
    const navigate = useNavigate()

   const usernameEditHandle=(e)=>{
    setUserdata({...userdata,username:e.target.value});
    dispatch(setUsername(e.target.value));
    // console.log(data.name,"edited............name");
   }

   const nameEditHandle=(e)=>{
    setUserdata({...userdata,name:e.target.value});
    dispatch(setName(e.target.value));
    // console.log(data.name,"editedname");
   }
   const emailEditHandle=(e)=>{
    setUserdata({...userdata,email:e.target.value});
    dispatch(setEmail(e.target.value));
    // console.log(data.email,"edit/////");
   }
   const phoneEditHandle=(e)=>{
    setUserdata({...userdata,phone:e.target.value});
    dispatch(setPhone(e.target.value));
    // console.log(data.phone,"editedname");
   }
   const imageEditHandle=(e)=>{
    setUserdata({...userdata,image:e.target.value});
    dispatch(setImage(e.target.value));
    // console.log(<data className="image"></data>,"editedname");
   }
   const passwordEditHandle=(e)=>{
    setUserdata({...userdata,password:e.target.value});
    dispatch(setPassword(e.target.value));
    // console.log(<data className="password"></data>);
   }

   const edituserSubmit=()=>{
    axiosInstance.post('editing/',userdata)
    .then((res)=>{
        console.log(res.data,"checkinggggggg");
        navigate('../admin-profile/')
    })
   }

   const {id}= useParams()
   console.log(id);

    const[userdata,setUserdata]=useState({
            id:id,
            username:"",
            name:"",
            email:"",
            phone:"",
            image:"",
            password:"",
    })

    useEffect(()=>{
        axiosInstance.get(`geteditdata/${id}`)
        .then((res)=>{
            console.log(res.data,"///");
            console.log(res.data.data.username,"//pppppppppppppppppppppppppppppppp/");
            setUserdata({...userdata,id:res.data.data.id,username:res.data.data.username,name:res.data.data.name,
            email:res.data.data.email,phone:res.data.data.phone,image:res.data.data.image,password:res.data.data.password})

        })

        
    },[])
    console.log(userdata,"///////////////////hhh/////////////////////");

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary text-white p-5'>
            <h1>EDIT NEW USER</h1>
            <form>
                <div>
                    <label htmlFor="username">UserName:</label>
                    <input type="text" value={userdata.username} name='username' className='form-control' 
                    onChange={usernameEditHandle}/>
                    
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" value={userdata.name} name='name' className='form-control' 
                    onChange={nameEditHandle}/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" value={userdata.email} name='email' className='form-control' 
                    onChange={emailEditHandle}/>
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input type="number" value={userdata.phone} name='phone' className='form-control' 
                    onChange={phoneEditHandle}/>
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input type="text" value={userdata.image} name='image' className='form-control' 
                    onChange={imageEditHandle}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="text" name='password' value={userdata.password} className='form-control'
                    onChange={passwordEditHandle} />
                </div>
            </form>
            <button className='btn btn-info' onClick={edituserSubmit}>Submit</button>
        </div>
    </div>
  )
}


export default EditUser
