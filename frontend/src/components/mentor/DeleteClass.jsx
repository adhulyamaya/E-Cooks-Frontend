import React from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../axios/mentoraxios'
import MentorHeader from "./MentorHeader";
import MentorSidebar from "./MentorSidebar";


const DeleteClass = () => {
    const {id}=useParams()
    const navigate=useNavigate()
    const yesHandle=()=>{
        axiosInstance.post(`deleteclass/${id}`)
        .then((res)=>{
          console.log(res.data);

          navigate('../classmanagement/')
        })    

    }
    const noHandle=()=>{
      navigate('../classmanagement/')
    }

  

  return (
    <div style={{ display: "flex" }}>
    <MentorSidebar/>
      <div style={{ flex: 1, padding: "20px", margin: 0 }}>
      <MentorHeader />
    <div>
    <div style={{ flex: 1, padding: "20px", margin: 0 }}>
      <p>Are you sure to delete the data ?</p>
      <button onClick={yesHandle}>yes</button>
      <button onClick={noHandle}>No</button>
    </div>
    </div>
    </div>
    </div>
  )
}

export default DeleteClass
