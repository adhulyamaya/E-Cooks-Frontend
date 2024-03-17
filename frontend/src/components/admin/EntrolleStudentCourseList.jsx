import { useState,useEffect } from 'react'
import React  from 'react'
import Box from '@mui/material/Box';
import axiosInstance from '../../axios/adminaxios';
import Navbar from './Navbar';
import SideBar from './SideBar';

const EntrolleStudentCourseList = () => {
  const [userdata, setUserdata] = useState([]);

  useEffect(() => {
    axiosInstance.get('entrolled-students/')
      .then((res) => {
        console.log(res.data,"data?");
        setUserdata(res.data.userdata);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); 

  return (
      <>
       <Navbar />
       <Box sx={{ flexGrow: 1, marginTop: '64px', marginLeft: '240px', padding: '20px' }}></Box>
       <SideBar />
       <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <h1></h1>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="table table-bordered">
       
                  <thead>
                    <tr>
                      <th style={{ paddingRight: '30px' }}>ORD ID</th>
                      <th style={{ paddingRight: '30px' }}>student name</th>
                      <th style={{ paddingRight: '30px' }}>classname</th>
                      <th style={{ paddingRight: '20px' }}>paid amount</th>
                      <th style={{ paddingRight: '20px' }}>booked date</th>
                      <th style={{ paddingRight: '20px' }}>booked time</th>
                      <th style={{ paddingRight: '20px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userdata.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.student_username}</td>
                        <td>{item.class_name}</td>
                        <td>{item.payment_amount}</td>
                        <td>{item.booking_date}</td>
                        <td>{item.booking_time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
      </>
  );
}

export default EntrolleStudentCourseList
