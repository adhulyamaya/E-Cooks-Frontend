import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changePassword, changeUsername } from "../feautures/loginslice";
import axiosInstance from '../axios/axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './Userlogin.css';
import Cookies from 'js-cookie';
import { isAuthenticated } from './authUtils';
import ProtectedRouteUsers from '../ProtectedRoute/ProtectedRouteUsers'; 


const Userlogin = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const navigate = useNavigate(); 

  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate('../'); 
    }
  }, []);
  
  const [error, setError] = React.useState(null); 

  const loginSubmit = () => {
    const datas = {
      username: login.value.username,
      password: login.value.password
    };

    axiosInstance.post('login/', datas)
      .then((res) => {
        console.log(res.data);
        const tokens = {
          access: res.data.access,
          refresh: res.data.refresh
        };
        localStorage.removeItem('adminDetails'); 
        Cookies.set("userDetails", JSON.stringify(res.data.userdata));
        Cookies.set("accessToken", JSON.stringify(res.data.access));
        if (res.data.message === "success")
          navigate('../');
      })
      .catch((error) => {
        console.error(error);
        setError('Invalid credentials. Please check your username and password.');
      });
  };


  return (
    <>
    <div className="background-container">
      <div className="login-form">
           <h1>Login</h1>
          <input placeholder='username' onChange={(e) => dispatch(changeUsername(e.target.value))} />
           <input placeholder='password' type="password" onChange={(e) => dispatch(changePassword(e.target.value))} />
           <button className="login-button" onClick={loginSubmit}>
             Login
           </button>
           {error && <p className="error-message">{error}</p>}

           <div className="google-login-wrapper">
           <GoogleLogin
            onSuccess={(credentialResponse) => {
              const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
              console.log(credentialResponseDecoded);
              console.log(credentialResponse);

              axiosInstance.post('google-login/', {
                googleToken: credentialResponseDecoded,
              })
                .then((res) => {
                  console.log(res.data, "weeeeeeeee");
                  const tokens = {
                    access: res.data.access,
                    refresh: res.data.refresh,
                  };
                  
                  Cookies.set('userDetails', JSON.stringify(res.data.userdata));
                  Cookies.set('accessToken', JSON.stringify(res.data.access));
                  if (res.data.message === 'success') {
                    navigate('../');
                  }
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          </div><br />
          <p> no account ? <Link to="/signup">SignUp here</Link></p>
        </div>
      </div>
     
      </>
    
  );
};

export default Userlogin;
