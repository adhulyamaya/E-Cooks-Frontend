import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios/mentoraxios';
import MentorHeader from "./MentorHeader";
import MentorSidebar from "./MentorSidebar";
import { IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setStudentId } from "../../feautures/signupSlice"

const PurchasedCourses = () => {
  const [userdata, setUserdata] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const confirmationHandle = (id) => {
    axiosInstance.post(`confirm-booking/${id}/`)
      .then((res) => {
        console.log(res.data, "Booking confirmed successfully");
        console.log(res.data.order.student, "Booking confirmed successfully");
        if (socket && socket.readyState === WebSocket.OPEN) {
          const notificationData = {
            recipient_id: res.data.order.student,
            content: "Your mentor confirmed the class time.",
          };
          socket.send(JSON.stringify(notificationData));
        }

        setUserdata((prevData) => {
          return prevData.map((item) => {
            if (item.id === id) {
              return { ...item, confirmation_status: true };
            }
            return item;
          });
        });
      })
      .catch((error) => {
        console.error("Error confirming booking:", error);
      });
  };

  
  const initiateChat = (student) => {
    console.log("Initiate chat with student:", student);
    dispatch(setStudentId(student))
    navigate('/chatroommentor')
  };

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8000/ws/notification/');

    newSocket.onopen = () => {
      console.log('WebSocket connection opened');
      setSocket(newSocket);
      setIsConnected(true); 
    };

    newSocket.onmessage = (event) => {
      try {
        const newUserData = JSON.parse(event.data);
    
        if (Array.isArray(newUserData)) {
          setUserdata((prevUserData) => [...prevUserData, ...newUserData]);
        } else {
          setUserdata((prevUserData) => {
            const existingItemIndex = prevUserData.findIndex(item => item.id === newUserData.id);
            if (existingItemIndex !== -1) {
              const updatedUserData = [...prevUserData];
              updatedUserData[existingItemIndex] = newUserData;
              return updatedUserData;
            }
            return prevUserData;
          });
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
    return () => {
      console.log('Cleaning up WebSocket connection');
      if (newSocket && newSocket.readyState === WebSocket.OPEN) {
        newSocket.close();
      }
    };
  }, []);

  useEffect(() => {
    axiosInstance.get("entrolledstudents/")
      .then((res) => {
        console.log(res.data, "displaying datas in mentor side");
        setUserdata(res.data.userdata);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!isConnected) {
    return <div>Loading...</div>; // Render a loading indicator until WebSocket is connected
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <MentorSidebar />
        <div style={{ flex: 1, padding: "20px", margin: 0 }}>
          <MentorHeader />
          <div className='container'>
            <div style={{ flex: 1, padding: "20px", margin: 0 }}>
              <table className='table'>
                <thead>
                  <tr>
                    <th style={{ paddingRight: '30px' }}>ORD ID</th>
                    <th style={{ paddingRight: '30px' }}>student name</th>
                    <th style={{ paddingRight: '30px' }}>classname</th>
                    <th style={{ paddingRight: '20px' }}>paid amount</th>
                    <th style={{ paddingRight: '20px' }}>booked date</th>
                    <th style={{ paddingRight: '20px' }}>booked time</th>
                    <th style={{ paddingRight: '20px' }}>availabilty</th>
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
                      <td>
                        {item.confirmation_status ? (
                          <button style={{ color: 'green' }}>Confirmed</button>
                        ) : (
                          <button onClick={() => confirmationHandle(item.id)} className='btn btn-sm btn-primary' disabled={item.confirmed}>
                            {item.confirmation_status === true ? 'Confirmed' : 'Confirm'}
                          </button>
                        )}
                      </td>
                      <td>
                        <IconButton onClick={() => initiateChat(item.student)} aria-label="chat">
                          <ChatIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PurchasedCourses;


