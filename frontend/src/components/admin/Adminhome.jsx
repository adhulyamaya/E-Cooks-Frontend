import React from "react";
import RouterOutlet from "../RouterOutlet/RouterOutlet";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import "./adminhome.css";
import Box from '@mui/material/Box';
import { Routes, Route } from 'react-router-dom'; 
import ProtectedRouteUsers from '../../ProtectedRoute/ProtectedRouteUsers'; 

const AdminHome = () => {
  return (
    <>
      <Navbar />
      <Box sx={30}/>
      <Box sx={{ display: 'flex' }}>     
        <SideBar /> 
        <Box sx={{ flexGrow:1,p:3 }}>    
          <div className="backgrnd" />
        </Box> 
      </Box>
      <Routes>
        <Route
          path="/admin-home"
          element={
            <ProtectedRouteUsers
              element={<RouterOutlet />}
            />
          }
        />
      </Routes>
    </>
  );
};

export default AdminHome;
