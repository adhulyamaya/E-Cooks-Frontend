// import React,{ useState }  from 'react'
// import { VideoRoom } from './VideoRoom';


// const VideoClass = () => {
//   const [joined, setJoined] = useState(false);
//   return (
//     <div>
//       <h1>WELCOME to Live Video Class</h1>
//       <div>
//        {!joined && (
//               <button onClick={() => setJoined(true)}>
//                  Join Room
//                </button>
//              )}


//            {joined && <VideoRoom />} 
//       </div>
//     </div>
//   )
// }

// export default VideoClass



import React, { useState } from 'react';
import axiosInstance from '../../axios/videocallaxios';
import { useSelector } from 'react-redux';
import { VideoRoom } from './VideoRoom';

const VideoClass = () => {
  const [joined, setJoined] = useState(false);
  const mentorsignup = useSelector((state) => state.mentorsignup);
  const mentorId = mentorsignup.value.mentorId;
  console.log(mentorId, "mentor id kitunno");
  const signup = useSelector((state) => state.signup);
  const studentId = signup.value.studentId;

  const handleJoinRoom = async () => {
    try {
      const response = await axiosInstance.post(`start-video-call/${mentorId}/${studentId}/`);
      const { data } = response;
      console.log('Video call session created:', data);
      setJoined(true);
    } catch (error) {
      console.error('Error creating video call session:', error);
    }
  };

  return (
    <div>
      <h1>WELCOME to Live Video Class</h1>
      <div>
        {!joined && (
          <button onClick={handleJoinRoom}>
            Join Room
          </button>
        )}
        {joined && <VideoRoom />}
      </div>
    </div>
  );
};

export default VideoClass;



// import React, { useEffect, useRef, useState } from 'react';
// import AgoraRTC from 'agora-rtc-sdk-ng';
// import axiosInstance from '../../axios/videocallaxios';
// import { useSelector } from 'react-redux';

// const VideoClass = () => {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [client, setClient] = useState(null);
//   const [joined, setJoined] = useState(false);
//   const [published, setPublished] = useState(false);
//   const [uid, setUid] = useState(null);
//   const [users, setUsers] = useState([]);
//   const mentorsignup = useSelector((state) => state.mentorsignup);
//   const mentorId = mentorsignup.value.mentorId;
//   const signup = useSelector((state) => state.signup);
//   const studentId = signup.value.studentId;

//   const appId = 'b69175e220d1424bac346732686c531c';
//   const appCertificate = '8e4a8b23049e4109b1bb2a7213d8936f';
//   const appToken = '007eJxTYPhgZRrj0J6Wce9lb2PZ427Zd/vjXt+7darvW9F+1ofeXfwKDGnJ5oYpSZYWqcmm5iYWBikWBkDKyMAs1SQ5EchJefznd2pDICNDxr8LLIwMEAjiMzFkZDIwAAAJZSMe';
//   const channel = 'hi';

//   const rtc = useRef(null);
//   const localStreamRef = useRef(null);
//   const remoteStreamRef = useRef(null);

//   useEffect(() => {
//     rtc.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' });
//     rtc.current.init(appId, () => {
//       joinChannel();
//     });
//     return () => {
//       leaveChannel();
//       rtc.current = null;
//     };
//   }, []);

//   const joinChannel = () => {
//     rtc.current.join(
//       appToken,
//       channel,
//       null, // You are not using token here, so set it to null
//       (uid) => {
//         setUid(uid);
//         createLocalStream(uid);
//         setJoined(true);
//       },
//       (error) => {
//         console.error('Failed to join channel:', error);
//       }
//     );
//   };

//   const createLocalStream = (uid) => {
//     console.log('Creating local stream with UID:', uid);
//     const localStream = AgoraRTC.createStream({
//       streamID: uid,
//       audio: true,
//       video: true,
//       screen: false,
//     });

//     localStream.init(
//       () => {
//         setLocalStream(localStream);
//         localStreamRef.current = localStream;
//         rtc.current.publish(localStream, (error) => {
//           if (error) {
//             console.error('Failed to publish local stream:', error);
//           } else {
//             console.log('Local stream published successfully');
//           }
//         });
//         setPublished(true);
//       },
//       (error) => {
//         console.error('Failed to initialize local stream:', error);
//       }
//     );
//   };

//   const handleLeave = () => {
//     leaveChannel();
//   };

//   const leaveChannel = () => {
//     if (rtc.current) {
//       rtc.current.leave(() => {
//         setJoined(false);
//         if (localStreamRef.current) {
//           localStreamRef.current.close();
//           setLocalStream(null);
//         }
//         if (remoteStreamRef.current) {
//           remoteStreamRef.current.close();
//           setRemoteStream(null);
//         }
//         setPublished(false);
//       });
//     }
//   };

//   const handleStartVideoCall = async () => {
//     if (joinChannel) {
//       try {
//         const response = await axiosInstance.post(`start-video-call/${mentorId}/${studentId}/`);
//         console.log('Video call initiated:', response.data);
//         if (response.data && response.data.success) {
//           const { response_data } = response.data;
//           const { channel_name } = response_data;

//           rtc.current.join(
//             appId,
//             channel_name,
//             null,
//             (uid) => {
//               setUid(uid);
//               createLocalStream(uid);
//               setJoined(true);
//             },
//             (error) => {
//               console.error('Failed to join channel:', error);
//             }
//           );
//         } else {
//           console.error('Error starting video call:', response.data.message);
//         }
//       } catch (error) {
//         console.error('Error starting video call:', error);
//       }
//     }
//   };

//   return (
//     <div>
//       <div>
//         <video
//           ref={(node) => {
//             if (node && localStream) {
//               node.srcObject = localStream.stream;
//             }
//           }}
//           autoPlay
//           muted
//           style={{ width: '300px', height: '200px', marginRight: '20px' }}
//         ></video>
//         {remoteStream && (
//           <video
//             ref={(node) => {
//               if (node && remoteStream) {
//                 node.srcObject = remoteStream.stream;
//               }
//             }}
//             autoPlay
//             style={{ width: '300px', height: '200px' }}
//           ></video>
//         )}
//       </div>
//       <div>
//         {!joined && <button onClick={joinChannel}>Join Channel</button>}
//         {joined && !published && <div>Joining channel...</div>}
//         {joined && published && <button onClick={handleLeave}>Leave Channel</button>}
//         <button onClick={handleStartVideoCall}>Initiate Video Call</button>
//       </div>
//     </div>
//   );
// };

// export default VideoClass;
