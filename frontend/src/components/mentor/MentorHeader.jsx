import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import io from "socket.io-client"; 

const Navbar = () => {
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    // paddingTop: "20px", 
    background: "#f0e8f0",
   
  };
  const navigate = useNavigate();

  const logoutSubmit = () => {
    Cookies.remove("mentorDetails");
    Cookies.remove("accessToken");
    navigate("../mentorlogin");
  };

  const logoutButtonStyle = {
    padding: "10px 10px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  };

  return (
    <nav style={headerStyle}>
      <div>
        <h1>E-Cooks </h1>
      </div>
      <ul style={{ listStyle: "none", display: "flex", gap: "20px" }}>
      
        <li><button style={logoutButtonStyle} onClick={logoutSubmit}>LOGOUT</button></li>
        
      </ul>
    </nav>
   
  );
};

export default Navbar;
