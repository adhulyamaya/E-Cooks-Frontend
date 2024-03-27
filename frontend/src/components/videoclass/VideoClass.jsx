import React, { useState } from 'react';
import { VideoRoom } from './VideoRoom';
import './Videocall.css';

const VideoClass = () => {
  const [joined, setJoined] = useState(false);

  return (
    <div className="video-class-container">
      <h1 className="video-class-title">WELCOME to Live Video Class</h1>
      <div className="video-class-content">
        {!joined && (
          <button className="join-room-button" onClick={() => setJoined(true)}>
            Join Room
          </button>
        )}

        {joined && <VideoRoom />}
      </div>
    </div>
  );
};

export default VideoClass;


















// import React, { useState } from 'react';
// import axiosInstance from '../../axios/videocallaxios';
// import { useSelector } from 'react-redux';
// import { VideoRoom } from './VideoRoom';
// import './Videocall.css'

// const VideoClass = () => {
//   const [joined, setJoined] = useState(false);
//   const mentorsignup = useSelector((state) => state.mentorsignup);
//   const mentorId = mentorsignup.value.mentorId;
//   console.log(mentorId, "mentor id kitunno");
//   const signup = useSelector((state) => state.signup);
//   const studentId = signup.value.studentId;

//   const handleJoinRoom = async () => {
//     try {
//       const response = await axiosInstance.post(`start-video-call/${mentorId}/${studentId}/`);
//       const { data } = response;
//       console.log('Video call session created:', data);
//       setJoined(true);
//     } catch (error) {
//       console.error('Error creating video call session:', error);
//     }
//   };

//   return (
//     <div className="video-class-container">
//       <h1 className="video-class-title">WELCOME to Live Video Class</h1>
//       <div className="video-class-actions">
//         {!joined && (
//           <button className="join-room-button" onClick={handleJoinRoom}>
//             Join Room
//           </button>
//         )}
//         {joined && <VideoRoom />}
//       </div>
//     </div>
//   );
// };

// export default VideoClass;

