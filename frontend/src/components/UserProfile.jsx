import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axios/axios';
import { storage } from "../../src/firebase/firebaseconfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from 'axios';
import "./userprofile.css"
import { Link } from 'react-router-dom';
import UserNav from './UserNav';
import Cookies from 'js-cookie';
const UserProfile = () => {
    const [image,setImage]=useState('')
    const navigate = useNavigate()
    const [udata,setUdata] = useState("")
    const [imageUrl,setImageUrl] = useState("")
    const [updateStatus, setUpdateStatus] = useState('not-updated');
  
    useEffect(()=>{
      const userobj = Cookies.get("userDetails")
      setUdata(JSON.parse(userobj))  
    },[])
    console.log(udata,"udataaaa");  
    function handleImage(e){
      console.log(e.target.files)
      setImage(e.target.files[0])
    }
    
    const handleApi=()=>{
      const reference = ref(storage, `users/${image.name + v4()}`);
      uploadBytes(reference, image)
      .then((response)=>{
        getDownloadURL(reference).then((url)=>{
          console.log(url, "PRINTED");
       
        const datas={
          id:udata.id,
          imageurl:url
        }
        
        axiosInstance.post("image-upload/",datas).then((response)=>{
          console.log(response.data,"RESPONSE DATAS")
          setUdata(response.data.details)
          setUpdateStatus('updated');
        }).catch((error)=>{
          alert(error)
        })
 
        })                
      })
    }
    const homeSubmit=()=>{
        navigate('../')
    } 
    return (
      <>
      <UserNav />
      <div className='nokk'>
      <br/>
      <br/>
      <h1>WELCOME <i>{udata.name}</i> </h1>
      <br/>
      <div className="user-profile-container">
        <div className="login-form">
        <div className='imgpr'>
          <img src={udata.image} alt="image" />          
        </div>
        <input type="file" name='file' onChange={handleImage} />
        <button onClick={handleApi} style={{ backgroundColor: '#8d63be', color: 'white',fontSize: '14px !important' }}> {updateStatus === 'not-updated' ? 'Update Photo' : 'Updated'}</button>
       
        <br />        
        <div className="user-info">
          <h3>{udata.username}</h3>
          <p>Email: {udata.email}</p>
          <p>User ID: {udata.id}</p>
          <p><Link to="/mycourses">MY COURSES</Link></p>
        </div>
        </div>        
        <br />
        <Link to="/">Back to Home</Link>
      </div>
      </div>
      </>
    );
    
}
export default UserProfile
