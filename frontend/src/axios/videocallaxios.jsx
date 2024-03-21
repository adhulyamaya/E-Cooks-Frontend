import axios from 'axios';

const videoCallAxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/video-call-api/',  
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

export default videoCallAxiosInstance;
