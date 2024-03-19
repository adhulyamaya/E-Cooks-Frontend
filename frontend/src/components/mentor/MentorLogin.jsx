import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axiosInstance from "../../axios/mentoraxios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "./mentorlogin.css"
import { isAuthenticated } from '../authUtils';
import { setMentorId } from '../../feautures/mentorSlice/mentorSignupSlice';


const Userlogin = () => {
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate('/mentordashboard'); 
    }
  }, []);

  const loginSubmit = () => {
    const data = {
      name: name,
      password: password,
    };

    axiosInstance.post("mentorlogin/", data).then((res) => {
      console.log(res.data,"hiiiiiiii");
      const mentorid =res.data.mentordata.id
      console.log(mentorid)
      dispatch(setMentorId(mentorid))
      
      const tokens = {
        access: res.data.access,
        refresh: res.data.refresh,
      };
      Cookies.set("mentorDetails", JSON.stringify(res.data.mentordata));
      Cookies.set("accessToken", JSON.stringify(res.data.access));
      if (res.data.message === "success") 
        navigate("/mentordashboard");

    });
  };
  return (
    <>    
    <div className="login-container">
    <div className="wrapper">
      <h2>MENTOR LOGIN </h2><br />
      <p>Are you a user {'>>>'}<Link to="/signup"> Login here</Link></p  >
      <div className="form-field">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
      </div>
      <div className="form-field">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div><br />
      <button className="btn" onClick={loginSubmit}>
        Login
      </button>
      <br /><br />
      <p>
        Don't have an account? <Link to="/mentorsignup">Sign Up here</Link>
      </p>
    </div>
    </div>
    </>
  );
};
export default Userlogin;
