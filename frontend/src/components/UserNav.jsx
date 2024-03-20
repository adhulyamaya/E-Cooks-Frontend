import React, { useEffect, useState, useRef } from 'react';

const UserNav = () => {
  const [notification, setNotification] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000/ws/notification/');

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(data,"notification data aano")
        console.log(data.notification,"notification aano")
          setNotification(data.notification.content);
       
      } catch (error) {
        console.error("Error processing notification message:", error);
      }
    };

    return () => {
      // Clean up WebSocket connection when component unmounts
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <div>
      <nav>
        <ul style={{ listStyle: "none", display: "flex", gap: "30px", marginLeft: "auto" }}>
          <li style={{ marginRight: "10px" }}><a href="/">Home</a></li>
          <li style={{ marginRight: "10px" }}><a href="/about">About</a></li>
          <li style={{ marginRight: "10px" }}><a href="/contact">Contact</a></li>
          <div className="notification-icon">
            <span className="icon">  
              <i className="fas fa-bell"></i>
            </span>
            <span className="notification-count">
              {notification && <p>{notification}</p>}
            </span>
          </div>
        </ul>
      </nav>

    </div>
  );
};

export default UserNav;















































































































// import React, { useEffect, useState } from 'react';

// const UserNav = () => {
//   const [notification, setNotification] = useState('');
//   const [socket, setSocket] = useState(null);
//   const [isConnected, setIsConnected] = useState(false); // Track WebSocket connection status

//   useEffect(() => {
//     const newSocket = new WebSocket('ws://localhost:8000/ws/notification/');

//     newSocket.onopen = () => {
//       console.log('WebSocket connected');
//       setSocket(newSocket);
//       setIsConnected(true); // Update connection status
//     };

//     newSocket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log(data, "received notification data");
//       const notificationData = data.notification;
//       setNotification(`New Notification: ${notificationData.content}`);
//     };

//     newSocket.onclose = () => {
//       console.log('WebSocket closed');
//       setIsConnected(false); // Update connection status
//     };

//     // Cleanup function
//     return () => {
//       console.log('Cleaning up WebSocket connection');
//       if (newSocket && newSocket.readyState === WebSocket.OPEN) {
//         newSocket.close();
//       }
//     };
//   }, []);

//   if (!isConnected) {
//     return <div>Loading...</div>; // Render a loading indicator until WebSocket is connected
//   }

//   return (
//     <div>
//       <h2>Notifications</h2>
//       <p>{notification}</p>
//     </div>
//   );
// };

// export default UserNav;
