import { Container, Divider, FormControl, Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useEffect, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';

const ChatRoomMentor = () => {
  const ENTER_KEY_CODE = 13;
  const scrollBottomRef = useRef(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const mentorsocket = useRef(null);
  const signup = useSelector((state) => state.signup);
  const studentId=signup.value.studentId
  
  console.log(signup)
  console.log("std id is",studentId)

  useEffect(() => {
    mentorsocket.current = new WebSocket('ws://localhost:8000/ws/chat/');

    mentorsocket.current.onopen = () => {
      console.log('WebSocket connected');
    };

    mentorsocket.current.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      setChatMessages((prevMessages) => [...prevMessages, messageData]);
      scrollBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return () => {
      if (mentorsocket.current) {
        mentorsocket.current.close();
      }
    };
  }, []);

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleEnterKey = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (user && message) {
      const messageData = {
        user: user,
        message: message,
        sender_type: 'mentor', 
        sender_id:71,
        receiver_type:'user',
        receiver_id:signup.value.studentId,
      };
      console.log('Sending message from mentorside:', messageData);
      if (mentorsocket.current.readyState === WebSocket.OPEN) {
        mentorsocket.current.send(JSON.stringify(messageData));
        setMessage('');
    } else {
        console.error('WebSocket not open.');
    }
    }
  };

  const listChatMessages = chatMessages.map((chatMessage, index) => (
    <ListItem key={index}>
      <ListItemText primary={`${chatMessage.user}: ${chatMessage.message}`} />
    </ListItem>
  ));

  return (
    <Fragment>
      <Container>
        <Paper elevation={5} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <Box p={3}>
            <Typography variant="h4" gutterBottom>
              Happy chatting!
            </Typography>
            <Divider />
            <List>
              {listChatMessages}
              <ListItem ref={scrollBottomRef}></ListItem>
            </List>
            <Grid container spacing={2} alignItems="center" style={{ marginTop: '20px' }}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <TextField onChange={handleUserChange} value={user} label="Nickname" variant="outlined" />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField onChange={handleMessageChange} onKeyDown={handleEnterKey} value={message} label="Type your message..." variant="outlined" />
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={sendMessage} aria-label="send" color="primary">
                  <SendIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default ChatRoomMentor;
