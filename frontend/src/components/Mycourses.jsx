import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../axios/axios';
import UserNav from './UserNav';
import UserFooter from './UserFooter';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatIcon from '@mui/icons-material/Chat';
import VideoCallIcon from '@mui/icons-material/VideoCall'; 
import { useNavigate } from 'react-router-dom';
import { setMentorId } from '../feautures/mentorSlice/mentorSignupSlice';


const MyCourses = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance.get('purchased-courses/')
      .then((res) => {
        console.log(res.data);
        setMyCourses(res.data.userdata);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChatWithMentor = (mentorId) => {
    console.log('Chat with mentor ID:', mentorId);
    dispatch(setMentorId(mentorId)); 
    navigate(`/chatroom`);
  };

  const handleVideoCallWithMentor = (mentorId) => {
    console.log('Video call with mentor ID:', mentorId);
    navigate(`/video-room/${mentorId}`);
    // navigate(`/videoclass`);
  };

  return (
    <>
      <UserNav />                                                                 
      <div style={{ margin: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {myCourses.map((course, index) => (
          <Card key={index} style={{ maxWidth: 345, height: '100%' }}>
            <CardHeader
              title={course.class_name.class_name}
              subheader={`Course: ${course.class_name}`}
              subheaderTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold', color: 'black', fontSize: '1.2rem' }}
            />
            <CardMedia
              component="img"
              height="194"
              image={course.booked_class.thumbnail}
              alt="Booked Class Thumbnail"
              style={{ objectFit: 'contain', height: '200px' }}
            />

            <CardActions disableSpacing>
              <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>

              <IconButton
                onClick={() => handleChatWithMentor(course.booked_class.mentor)}
                aria-label="chat with mentor"
              >
                <ChatIcon />
              </IconButton>

              <IconButton
                onClick={() => handleVideoCallWithMentor(course.booked_class.mentor)}
                aria-label="video call with mentor"
              >
                <VideoCallIcon />
              </IconButton>
            </CardActions>
            <CardContent>
              <Typography paragraph hidden={!expanded}>
                Booking Date: {course.booking_date}
              </Typography>
              <Typography paragraph hidden={!expanded}>
                Booking Time: {course.booking_time}
              </Typography>
              <Typography paragraph hidden={!expanded}>
                Order Date: {course.order_date}
              </Typography>
              <Typography paragraph hidden={!expanded}>
                Paid Amount: {course.payment_amount}
              </Typography>
              <Typography paragraph hidden={!expanded}>
                Confirmation Status: <span style={{ color: course.confirmation_status ? 'green' : 'red' }}>
                  {course.confirmation_status ? 'Confirmed' : 'Not Confirmed'}
                </span>
              </Typography>
              <Typography paragraph hidden={!expanded}>
                Student ID: {course.student}
              </Typography>
              <Typography paragraph hidden={!expanded}>
                Booked Class: {course.booked_class.class_name}
              </Typography>
              <Typography paragraph hidden={!expanded}>
                Mentor: {course.booked_class.mentor}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div style={{ margin: '' }}>
        <UserFooter />
      </div>
    </>
  );
};

export default MyCourses;





















