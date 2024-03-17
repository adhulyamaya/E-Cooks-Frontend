import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios/adminaxios';
import SideBar from './SideBar';
import Navbar from './Navbar';
import Box from '@mui/material/Box';

const CourseManage = () => {
  const [classdata, setClassdata] = useState([]);

  useEffect(() => {
    axiosInstance.get('admin-class-list/')
      .then((res) => {
        console.log(res.data);
        setClassdata(res.data.classdata);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, marginTop: '64px', marginLeft: '240px', padding: '20px' }}>
        <SideBar />
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <h1></h1>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Course id</th>
                  <th>Course Name</th>
                  <th>description</th>
                  <th>syllabus</th>
                  <th>Instructor Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {classdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.class_name}</td>
                    <td>{item.course_description}</td>
                    <td>{item.syllabus}</td>
                    <td>{item.mentor}{item.mentor.name}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Box>
    </>
  );
};

export default CourseManage;
