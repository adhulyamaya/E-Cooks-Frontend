import React,{ useState }  from 'react'
import { VideoRoom } from './VideoRoom';


const VideoClass = () => {
  const [joined, setJoined] = useState(false);
  return (
    <div>
      <h1>hi,finally ur classs is starting</h1>
      <div>

       {!joined && (
               <button onClick={() => setJoined(true)}>
                 Join Room
               </button>
             )}


           {joined && <VideoRoom />} 
      </div>
    </div>
  )
}
export default VideoClass
