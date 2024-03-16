
import React, { useState } from "react";
// import "./adminlogin.css";
import axiosInstance from "../../axios/adminaxios";
import { useNavigate } from "react-router-dom";
import ProtectedRouteUsers from '../../ProtectedRoute/ProtectedRouteUsers'
import Cookies from 'js-cookie';
const Adminlogin = () => {
    const [adminUsername, setUsername] = useState("");
    const [adminPassword, setPassword] = useState("");
    const [error,setError]=useState(null);
    const navigate=useNavigate();
    const handleSignup = (e) => {
        e.preventDefault(); 
        console.log("Signup details:", { adminUsername,  adminPassword });
        const datas = {
          username: adminUsername,
          password: adminPassword,
        };
    
        axiosInstance.post('adminlogin/', datas)
          .then((res) => {
            const tokens = {
              access: res.data.access,
              refresh: res.data.refresh,
            };
            Cookies.set("adminDetails", JSON.stringify(res.data.userdataa));
            Cookies.set("accessToken", JSON.stringify(res.data.access));
            if (res.data.message === 'success') {
              navigate('/admin-home');
            }
          })
          .catch((error) => {
            console.error(error);
            setError('Invalid credentials. Please check your username and password.');
          });
      };   
    return (
        <>
            <div className="bgImg">
            <div className="container">
                <form onSubmit={handleSignup}>
                    <h1>Sign Up</h1>
                    <div className="ui divider"></div>
                    <div className="ui form">
                        <div className="field">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Choose a username"
                                value={adminUsername}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={adminPassword}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="login">Submit</button>
                    </div>
                </form>
            </div>
            </div>
        </>
    );
};

export default Adminlogin;



