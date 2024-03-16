import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosIns from '../../axios/adminaxios'
import 'bootstrap/dist/css/bootstrap.min.css'
import SideBar from './SideBar'
import Navbar from './Navbar'
import Box from '@mui/material/Box'

const AdminProfile = () => {
  const navigate = useNavigate()

  const homeSubmit = () => {
    navigate('../home')
  }

  const [userdata, setUserdata] = useState([]);

  const toggleBlock = (userId) => {
    axiosIns.patch(`toggle-block/${userId}/`)

      .then((res) => {
        if (res.data.success) {
          setUserdata((prevData) => {
            const updatedData = prevData.map((user) =>
              user.id === userId ? { ...user, blocked: !user.blocked } : user
            );
            return updatedData;
          });
        } else {
          console.error('Toggle block failed');
        }
      })
      .catch((error) => {
        console.error('Toggle block failed', error);
      });
  };

  useEffect(() => {
    axiosIns.get('admin-user-profile/')
      .then((res) => {
        console.log(res.data);
        setUserdata(res.data.userdata)
      })
      .catch((error) => {
        console.error(error);
      });

  }, [])

  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, marginTop: '64px', marginLeft: '240px', padding: '20px' }}>
        <SideBar />
        <div className='container'>
          <h1>USERS</h1>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '600px' }}>
              <thead>
                <tr>
                  <th>USERNAME</th>
                  <th>NAME</th>
                  <th>USER EMAIL</th>
                  <th>image</th>
                  <th>USER PH</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {userdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.username} </td>
                    <td>{item.name} </td>
                    <td>{item.email}</td>
                    <td>
                      <img src={item.image} alt="User Image" style={{ width: '50px', height: '50px' }} />
                    </td>
                    <td>{item.phone}</td>
                    <td>
                      <button onClick={() => toggleBlock(item.id)}>
                        {item.blocked ? 'Unlock' : 'Block'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Box>
    </>
  )
}

export default AdminProfile
