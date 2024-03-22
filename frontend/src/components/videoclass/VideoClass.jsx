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

import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk';
import axiosInstance from '../../axios/videocallaxios';
import { useSelector } from 'react-redux';

const VideoClass = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [client, setClient] = useState(null);
  const [joined, setJoined] = useState(false);
  const [published, setPublished] = useState(false);
  const [uid, setUid] = useState(null);
  const [users, setUsers] = useState([]);
  const mentorsignup = useSelector((state) => state.mentorsignup);
  const mentorId = mentorsignup.value.mentorId;
  const signup = useSelector((state) => state.signup);
  const studentId=signup.value.studentId

  const appId = 'b69175e220d1424bac346732686c531c'; 
  
  const appCertificate = '8e4a8b23049e4109b1bb2a7213d8936f';
  const TOKEN = '007eJxTYPhgZRrj0J6Wce9lb2PZ427Zd/vjXt+7darvW9F+1ofeXfwKDGnJ5oYpSZYWqcmm5iYWBikWBkDKyMAs1SQ5EchJefznd2pDICNDxr8LLIwMEAjiMzFkZDIwAAAJZSMe';
  const channel = 'hi';

  const rtc = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);

  useEffect(() => {
    rtc.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'h264' });

    // Join the Agora channel when component mounts
    rtc.current.init(appId, () => {
      joinChannel();
    });

    // Clean up function
    return () => {
      leaveChannel();
      rtc.current = null;
    };
  }, []);

  const joinChannel = () => {
    rtc.current.join(
      appId,
      channel,
      appCertificate,
      // null,
      (uid) => {
        setUid(uid);
        createLocalStream(uid);
        setJoined(true);
      },
      (error) => {
        console.error('Failed to join channel:', error);
      }
    );
  };

  const createLocalStream = (uid) => {
    console.log('Creating local stream with UID:', uid);
    const localStream = AgoraRTC.createStream({
      streamID: uid,
      audio: true,
      video: true,
      screen: false,
    });
    localStream.init(
      () => {
        console.log('Local stream initialized successfully');
        setLocalStream(localStream);
        localStreamRef.current = localStream;
        rtc.current.publish(localStream, (error) => {
          if (error) {
            console.error('Failed to publish local stream:', error);
          } else {
            console.log('Local stream published successfully');
          }
        });
        setPublished(true);
      },
      (error) => {
        console.error('Failed to initialize local stream:', error);
      }
    );
  };

  const handleLeave = () => {
    leaveChannel();
  };

  const leaveChannel = () => {
    if (rtc.current) {
      rtc.current.leave(() => {
        setJoined(false);
        if (localStreamRef.current) {
          localStreamRef.current.close();
          setLocalStream(null);
        }
        if (remoteStreamRef.current) {
          remoteStreamRef.current.close();
          setRemoteStream(null);
        }
        setPublished(false);
      });
    }
  };

  // useEffect(() => {
  //   rtc.current.on('user-published', handleUserPublished);
  //   rtc.current.on('user-unpublished', handleUserUnpublished);
  //   rtc.current.on('user-left', handleUserLeft);
  
  //   return () => {
  //     if (rtc.current) {
  //       rtc.current.off('user-published', handleUserPublished);
  //       rtc.current.off('user-unpublished', handleUserUnpublished);
  //       rtc.current.off('user-left', handleUserLeft);
  //     }
  
  //     if (localStreamRef.current) {
  //       localStreamRef.current.close();
  //       localStreamRef.current = null;
  //     }
  
  //     if (remoteStreamRef.current) {
  //       remoteStreamRef.current.close();
  //       remoteStreamRef.current = null;
  //     }
  //   };
  // }, []);
  const handleUserPublished = async (user, mediaType) => {
    await rtc.current.subscribe(user, mediaType);
    if (mediaType === 'video') {
      setRemoteStream(user.stream);
      remoteStreamRef.current = user.stream;
    }
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const handleUserUnpublished = (user) => {
    setRemoteStream(null);
    if (remoteStreamRef.current) {
      remoteStreamRef.current.close();
      remoteStreamRef.current = null;
    }
    setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
  };

  const handleUserLeft = (user) => {
    setRemoteStream(null);
    if (remoteStreamRef.current) {
      remoteStreamRef.current.close();
      remoteStreamRef.current = null;
    }
    setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
  };

  const handleStartVideoCall = async () => {
    if (joinChannel)  
    try {
      // Send a request to your backend to notify the mentor about the video call
      const response = await axiosInstance.post(`start-video-call/${mentorId}/${studentId}/`);
      console.log('Video call initiated:', response.data);
      if (response.data && response.data.success) {
        // Access the channel_name from response_data
        const { response_data } = response.data;
        const { channel_name } = response_data;
  
        // Join the Agora channel using the received channel_name
        rtc.current.join(
          appId,
          channel_name,
          appCertificate,
          (uid) => {
            setUid(uid);
            createLocalStream(uid);
            setJoined(true);
          },
          (error) => {
            console.error('Failed to join channel:', error);
          }
        );
  
      } else {
        console.error('Error starting video call:', response.data.message);
      }
    } catch (error) {
      console.error('Error starting video call:', error);
    }
  }; 
  return (
    <div>
      {/* <h2>Video Call with {}</h2> */}
      <div>
        <video
          ref={(node) => {
            if (node && localStream) {
              node.srcObject = localStream.stream;
            }
          }}
          autoPlay
          muted
          style={{ width: '300px', height: '200px', marginRight: '20px' }}
        ></video>
        {remoteStream && (
          <video
            ref={(node) => {
              if (node && remoteStream) {
                node.srcObject = remoteStream.stream;
              }
            }}
            autoPlay
            style={{ width: '300px', height: '200px' }}
          ></video>
        )}
      </div>
      <div>
        {!joined && <button onClick={joinChannel}>Join Channel</button>}
        {joined && !published && <div>Joining channel...</div>}
        {joined && published && <button onClick={handleLeave}>Leave Channel</button>}
        <button onClick={handleStartVideoCall}>Initiate Video Call</button>
      </div>
    </div>
  );
};

export default VideoClass;



