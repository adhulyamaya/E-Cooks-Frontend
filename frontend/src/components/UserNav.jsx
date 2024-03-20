import React, { useEffect, useState, useRef } from 'react';
import './UseNav.css'
const UserNav = () => {
  const [notification, setNotification] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [newNotification, setNewNotification] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000/ws/notification/');

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(data, "notification data");
        console.log(data.notification, "notification content");
        setNotification(data.notification.content);
        setShowNotification(true);
        setNewNotification(true);

       
        setTimeout(() => {
          setShowNotification(false);
          setNewNotification(false);
        }, 5000);
      } catch (error) {
        console.error("Error processing notification message:", error);
      }
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleNotificationClick = () => {
    setShowNotification(!showNotification); // Toggle notification displayyy
    if (newNotification) {
      setNewNotification(false); // Mark as read if it's a new notification
    }
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
    setNewNotification(false);
  };

  return (
    <div>
      <nav className="nav">
        <ul className="nav_item" style={{ listStyle: "none", display: "flex", gap: "30px", marginLeft: "auto" }}>
          <li style={{ marginLeft: "10px" }}><a href="/">Home</a></li>
          <li style={{ marginRight: "10px" }}><a href="/about">About</a></li>
          <li style={{ marginRight: "10px" }}><a href="/contact">Contact</a></li>
          <li style={{ marginRight: "10px" }}><a href="/courses">All Courses</a></li>
          
          <div className="notification-icon" onClick={handleNotificationClick}>
            <span className="icon">
              <i className="fas fa-bell"></i>
              {newNotification && <span className="notification-dot"></span>}
            </span>
            <span className="notification-count">
              {showNotification && (
                <div className="notification">
                  <p>{notification}</p>
                  <button className="close-btn" onClick={handleNotificationClose}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              )}
            </span>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default UserNav;

