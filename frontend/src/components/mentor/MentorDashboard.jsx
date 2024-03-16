import React from "react";
import { useNavigate } from "react-router-dom";
import MentorHeader from "./MentorHeader";
import MentorSidebar from "./MentorSidebar";

const MentorDashboard = () => {
  const navigate = useNavigate();

  const classManagement = () => {
    navigate("../classmanagement");
  };
  const enrolledStudents = () => {
    navigate("/purchased courses");
  };

  return (
    <div style={{ display: "flex" }}>
     
      <MentorSidebar
        onClassManagementClick={classManagement}
        onEnrolledStudentsClick={enrolledStudents}
      />
      <div style={{ flex: 1, padding: "20px", margin: 0 }}>

        <MentorHeader />
       
      </div>
    </div>
  );
};

export default MentorDashboard;
