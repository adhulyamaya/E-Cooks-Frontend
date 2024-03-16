import React from 'react'
import {changeName,changePassword,setMentorId} from '../../feautures/mentorSlice/mentorSignupSlice'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios/mentoraxios';
import { Link } from 'react-router-dom'; 
import './signup.css'

const Mentorssignup= () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mentorsignup = useSelector((state) => state.mentorsignup);

    const mentorsignupSubmit = () => {
      const datas = {
          name: mentorsignup.value.name,
          password: mentorsignup.value.password,
      }
      console.log(datas, "mentor nta data aaa ");


      axiosInstance.post('mentorsignup/', datas)
          .then((res) => {

            console.log(res.data, "mentor nta data aaa ");
            const mentorId = res.data.mentor_id;

            
          dispatch(setMentorId(mentorId));
          console.log(mentorId,"from set mentor id") 
            
              console.log('Mentor ID:', mentorId);
              console.log(res,"response from BACKEND");
              if (res.data.message === "success") {
                  console.log(res.data.message)
                  navigate('../mentoronboard',{ state: { mentorId } });
              }
          })
  }

  return (
    <>
    <div className="login-container">
    <div className="wrapper">
      <h2 >MENTOR SIGNUP</h2><br /><br />
      <h4 >Welcome</h4>
      <div className="form-field">
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => dispatch(changeName(e.target.value))}
        />
      </div>
      <div className="form-field">
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => dispatch(changePassword(e.target.value))}
        />
      </div><br />
      <button className="btn" onClick={mentorsignupSubmit}>
         Sign Up
      </button><br /><br />
      <p>
                Already have an account? <Link to="/mentorlogin">Login here</Link>
              </p>
    </div>
    </div></>
  );
}
export default Mentorssignup