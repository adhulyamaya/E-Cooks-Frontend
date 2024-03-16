// import React from 'react'
// import { useState,useEffect } from 'react'
// import axiosInstance from '../../axios/adminaxios'
// import SideBar from './SideBar'
// import Navbar from './Navbar'
// import Box from '@mui/material/Box';

// const CourseManage = () => {
//     const[classdata,setClassdata]=useState([])

//     useEffect(()=>{
//         axiosInstance.get('admin-class-list/')
//         .then((res)=>{
//             console.log(res.data)
//             setClassdata(res.data.classdata)

//         })

        
//         .catch((error)=>{
//             console.error(error);
//         })
//     },[])

//   return (
//     <>
//     <Navbar/>
//     {/* <div class='container'> */}
        

//         <Box sx={30}/>
//         <SideBar/>
//         <h1>COURSES</h1>
//         <table style={{ borderCollapse: 'collapse', width: '100%' }}> 
//         <thead>
//         <tr>
//         <th>course name</th>
//         <th>instructor name</th>
//         <th>price</th>
//         </tr>
//         {classdata.map((item)=>(
//            <tr key={item.id}>
//               <td>{item.class_name} </td>
//               <td>{item.mentor.fullname} </td>
//               <td>{item.price}</td>
//               </tr>))}
//         </thead>
//         </table>
      
//     {/* </div> */}
//     </>
//   )
// }

// export default CourseManage
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
        <h1>COURSES</h1>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '600px' }}>
            <thead>
              <tr>
                <th>course name</th>
                <th>instructor name</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {classdata.map((item) => (
                <tr key={item.id}>
                  <td>{item.class_name}</td>
                  <td>{item.mentor.fullname}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </>
  );
};

export default CourseManage;
