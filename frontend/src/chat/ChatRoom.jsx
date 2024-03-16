import { Container, Divider, FormControl, Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import UserNav from "../components/UserNav";
import UserFooter from "../components/UserFooter";


const Chat = () => {
    const ENTER_KEY_CODE = 13;
    const scrollBottomRef = useRef(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const ws = useRef(null);
    const mentorsignup = useSelector((state) => state.mentorsignup);
    const mentorId = mentorsignup.mentorId

    
    console.log(mentorId,"hi")
    console.log(mentorsignup,mentorsignup.value.mentorId,'hlp')
   
    useEffect(() => {
        // Establish WebSocket connection when component mounts
        ws.current  = new WebSocket('ws://localhost:8000/ws/chat/');
        
        ws.current.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.current.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            // Update chat messages with incoming message
            setChatMessages([...chatMessages, messageData]);
            // Scroll to bottom when new message received
            scrollBottomRef.current.scrollIntoView({ behavior: 'smooth' });
        };

        return () => {
            // Clean up WebSocket connection when component unmounts
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []) // Empty dependency array ensures this runs only once

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
                sender_type: 'user', 
                sender_id:31,
                receiver_type:'mentor',
                receiver_id:mentorsignup.value.mentorId,
            };
            // Send message to WebSocket server
            console.log('Sending message userside:', messageData);
            if (ws.current.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify(messageData));
                setMessage('');
            } else {
                console.error('WebSocket not open.');
            }
        }
    };

    const listChatMessages = chatMessages.map((chatMessageDto, index) => (
        <ListItem key={index}>
            <ListItemText primary={`${chatMessageDto.user}: ${chatMessageDto.message}`} />
        </ListItem>
    ));

    return (
        <Fragment>
            <UserNav />
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
                                    <TextField
                                        onChange={handleUserChange}
                                        value={user}
                                        label="name"
                                        variant="outlined"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        onChange={handleMessageChange}
                                        onKeyDown={handleEnterKey}
                                        value={message}
                                        label="Type your message..."
                                        variant="outlined"
                                    />
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

export default Chat;
