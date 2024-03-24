import React,{useEffect,useRef} from 'react'

  const VideoPlayer = ({ user }) => {
  const ref = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, [user.videoTrack]);

  return (
    <div>
      Uid: {user.uid}
      <div
        ref={ref}
        style={{ width: '200px', height: '200px' }}
      ></div>
      
    </div>
    
  )
}


export default VideoPlayer
// import React, { useEffect, useRef } from 'react';

// const VideoPlayer = ({ user }) => {
//   const videoRef = useRef();

//   useEffect(() => {
//     if (user && user.videoTrack) {
//       user.videoTrack.play(videoRef.current);
//     }

//     return () => {
//       if (user && user.videoTrack) {
//         user.videoTrack.stop();
//         user.videoTrack.close();
//       }
//     };
//   }, [user]);

//   return (
//     <div>
//       Uid: {user.uid}
//       <div ref={videoRef} style={{ width: '200px', height: '200px' }} />
//     </div>
//   );

// };

// export default VideoPlayer;
