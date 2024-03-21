import React, { useState } from 'react';
// import VideoCall from './VideoCall'; // Assuming VideoCall component is accessible
import { VideoRoom } from './VideoRoom';


const VideoMentor = () => {
  const [mentorId, setMentorId] = useState(''); // Pre-filled or fetched from backend

  const handleJoinCall = () => {
    // Call a function (using context or props) to join the room using mentorId
    joinRoom(mentorId);
  };


  const joinRoom = (mentorId) => {
    // Logic to join the room using mentorId (likely involves Agora client interactions)
    // Potentially interacting with VideoCall component or using context
  };

  return (
    <div>
      <h1>Mentor Video Call</h1>
      <input
        type="text"
        placeholder="Enter Your Mentor ID"
        value={mentorId}
        onChange={(e) => setMentorId(e.target.value)}
      />
      <button onClick={handleJoinCall}>Join Call</button>
      {mentorId && <VideoRoom userId="" mentorId={mentorId} />} // User ID is not needed here
    </div>
  );
};

export default VideoMentor;
