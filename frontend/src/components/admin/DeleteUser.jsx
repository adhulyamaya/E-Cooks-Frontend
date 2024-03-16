import React from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../axios/axios'



const DeleteUser = () => {
    const {id}=useParams()
    const navigate=useNavigate()
    const yesHandle=()=>{
        axiosInstance.post(`deleteuser/${id}`)
        .then((res)=>{
          console.log(res.data);

          navigate('../admin-profile/')
        })    

    }
    const noHandle=()=>{
      navigate('../admin-profile/')
    }

  

  return (
    <div>
      <p>Are you sure to delete the data</p>
      <button onClick={yesHandle}>yes</button>
      <button onClick={noHandle}>No</button>
    </div>
  )
}

export default DeleteUser
