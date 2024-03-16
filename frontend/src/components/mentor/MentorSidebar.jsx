// MentorSidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";



const MentorSidebar = () => {
  const navigate = useNavigate();

  const classManagement = () => {
    navigate("../classmanagement");
  };
  const enrolledStudents = () => {
    navigate("/purchased courses");
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={sidebarStyle}>
        <div style={menuItemStyle} onClick={classManagement}>
          Class Management
        </div>
        <div style={menuItemStyle} onClick={enrolledStudents}>
          Entrolled Students
        </div>
      </div>
      
    </div>
  );
};

const sidebarStyle = {
  width: "210px",
  height: "1000px",
  backgroundColor: "#a07fa0",
  color: "#fff",
  padding: "20px",
};

const menuItemStyle = {
  padding: "10px",
  cursor: "pointer",
  borderBottom: "1px solid #fff",
};

export default MentorSidebar;
