import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import VideoPlayer from './VideoPlayer';

const APP_ID = 'fc71db98ec57480d80748206e4cad80d';
const CHANNEL = 'hi';
const TOKEN ='007eJxTYBC5/k/2+rczc/Y97JwtM23N/L2B8kW1EVHvT/CfX7ms7mmjAkNasrlhSpKlRWqyqbmJhUGKhQGQMjIwSzVJTgRyUuLmMqc1BDIy8G8NYmCEQhCfiSEjk4EBAOshIJM='

const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

export const VideoRoom = () => {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const [joined, setJoined] = useState(false);

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === 'video') {
      setUsers((prevUsers) => {
        // Check if user already exists, update their tracks if so
        const existingUser = prevUsers.find(u => u.uid === user.uid);
        if (existingUser) {
          existingUser.videoTrack = user.videoTrack;
          existingUser.audioTrack = user.audioTrack;
          return [...prevUsers];
        }
        return [...prevUsers, user];
      });
    }

    if (mediaType === 'audio') {
      console.log("User", user.uid, "has joined");
    }
  };

  const handleUserLeft = (user) => {
    setUsers((prevUsers) =>
      prevUsers.filter((u) => u.uid !== user.uid)
    );
  };

  useEffect(() => {
    client.on('user-published', handleUserJoined);
    client.on('user-left', handleUserLeft);

    client
      .join(APP_ID, CHANNEL, TOKEN, null)
      .then((uid) =>
        Promise.all([
          AgoraRTC.createMicrophoneAndCameraTracks(),
          uid,
        ])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((prevUsers) => [
          ...prevUsers,
          {
            uid: 'local',
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);
        setJoined(true);
      });

    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.off('user-published', handleUserJoined);
      client.off('user-left', handleUserLeft);
      client.unpublish(localTracks).then(() => client.leave());
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 200px)' }}>
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
};
