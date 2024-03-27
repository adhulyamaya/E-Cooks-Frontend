import React,{useEffect,useRef} from 'react'

  const VideoPlayer = ({ user }) => {
  const ref = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, [user.videoTrack]);

  return (
    <div>
      <div
        ref={ref}
        style={{ width: '400px', height: '200px' }}
      ></div>
      
    </div>
    
  )
}
export default VideoPlayer

