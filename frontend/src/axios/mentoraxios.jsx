import axios from 'axios'

const mentorAxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/mentor/',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
})

export default mentorAxiosInstance