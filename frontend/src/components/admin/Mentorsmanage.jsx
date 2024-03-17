import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import SideBar from './SideBar';
import Navbar from './Navbar';
import axiosIns from '../../axios/adminaxios';

const Mentorsmanage = () => {
  const navigate = useNavigate();
  const homeSubmit = () => {
    navigate('../home');
  };
  const [userdata, setUserdata] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axiosIns.get('admin-mentor-list/')
      .then((res) => {
        console.log(res.data);
        setUserdata(res.data.userdata);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  const handleApproval = (mentorId, isApproved) => {
    axiosIns.post('mentor-approval/', { mentor_id: mentorId, is_approved: isApproved })
      .then((res) => {
        if (res.data.message === "success") {
          setMessage(`Mentor ID ${mentorId} has been ${isApproved ? 'approved' : 'rejected'}.`);
          console.log(res.data.message);
        }
        // Reload the data after approval/rejection
        axiosIns.get('admin-mentor-list/')
          .then((res) => {
            setUserdata(res.data.userdata);
          })
          .catch((error) => {
            console.error(error);
          });
      });
  };

  return (
    <>
      <Navbar />
      <br />
      <br />
      
      <Box sx={{ flexGrow: 1, marginTop: '64px', marginLeft: '240px', padding: '20px' }}>
        <SideBar />
        {message && (
          <div style={{ marginBottom: '20px', backgroundColor: '#f2f2f2', padding: '10px' }}>
            {message}
          </div>
        )}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '600px' }}>
            <thead>
              <tr>
                <th style={{ padding: '12px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>FULLNAME</th>
                <th style={{ padding: '12px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>EMAIL</th>
                <th style={{ padding: '12px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>EXPERIENCE</th>
                <th style={{ padding: '12px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>EXPERTISE</th>
                <th style={{ padding: '12px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>AVAILABILITY END TIME</th>
                <th style={{ padding: '12px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>AVAILABILITY START TIME</th>
                <th style={{ padding: '12px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Approval Status</th>
              </tr>
            </thead>
            <tbody>
              {userdata.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{item.fullname}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{item.email}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{item.experience}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{item.expertise}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{item.availability_end_time}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{item.availability_start_time}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                    <button
                      style={{ marginRight: '8px', padding: '8px', backgroundColor: 'green', color: 'white', border: 'none' }}
                      onClick={() => handleApproval(item.id, true)}
                    >
                      Approve
                    </button>
                    <button
                      style={{ padding: '8px', backgroundColor: 'red', color: 'white', border: 'none' }}
                      onClick={() => handleApproval(item.id, false)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </>
  );
};

export default Mentorsmanage;
