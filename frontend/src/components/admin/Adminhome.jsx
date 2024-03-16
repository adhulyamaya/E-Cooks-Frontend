// import React,{useEffect,useState} from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import RouterOutlet from "../RouterOutlet/RouterOutlet";


// function AdminHome(){
//     const navigate=useNavigate()

//     const logoutSubmit=()=>{
//         localStorage.removeItem("adminDetails")
//         localStorage.removeItem("accessToken")
//         navigate('../adminlogin')
//     }
 
//     return(
//         <>
//         <button onClick={logoutSubmit}>Logout </button>
//         <br />
//         <Link to="/admin-profile">ALL USERS</Link>
//         <br />
//         <Link to="/admin-home/mentors-manage">MENTORS</Link>
//         <br />
//         <Link to="/admin-home/course-manage">COURSES</Link>
        
//         <RouterOutlet/>
//         </>
        
//     )
// }
// export default AdminHome

import React from "react";
import { useNavigate } from "react-router-dom";
import RouterOutlet from "../RouterOutlet/RouterOutlet";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import "./adminhome.css"
import Box from '@mui/material/Box';


const AdminHome = () => {
  const navigate = useNavigate();

  const logoutSubmit = () => {
    localStorage.removeItem("adminDetails");
    localStorage.removeItem("accessToken");
    navigate("../adminlogin");
  };

  return (
    <>
    <Navbar />

      <Box sx={30}/>

      <Box sx={{ display: 'flex' }}>     
        <SideBar /> 
        <Box sx={{ flexGrow:1,p:3 }}>    
        <div className="backgrnd" >
          </div> 
          </Box> 
        </Box>  
     
        
          <button onClick={logoutSubmit}>logoutyyyyyyyyyyyyyyyyyyyyyy</button>
          <br />        
         
      
        
        <RouterOutlet />
    
     
    </>
  );
};

export default AdminHome;
