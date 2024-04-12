import React, { useState } from "react";
import axiosInstance from "../../axios/adminaxios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { isAuthenticated } from '../authUtils';
import "./adminlogin.css"

const Adminlogin = () => {
    const [adminUsername, setUsername] = useState("");
    const [adminPassword, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isAuthenticated()) {
            navigate('/admin-home');
        }
    }, []);

    const handleSignup = (e) => {
        e.preventDefault();
        console.log("Signup details:", { adminUsername, adminPassword });
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
            <div className="admincontainer">
                <div className="wrapper">
                    <form onSubmit={handleSignup}>
                        <h2>ADMIN LOGIN</h2><br />
                        <div className="form-field">
                            <input
                                type="text"
                                name="username"
                                placeholder="Choose a username"
                                value={adminUsername}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                           
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={adminPassword}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="error">{error}</p>}
                        <button className="login">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Adminlogin;
