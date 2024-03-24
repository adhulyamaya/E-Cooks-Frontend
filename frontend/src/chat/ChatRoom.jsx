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
    console.log(mentorsignup,mentorsignup.value.mentorId,'hlp')
   
    useEffect(() => {
        ws.current  = new WebSocket('ws://localhost:8000/ws/chat/');
        
        ws.current.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.current.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            setChatMessages([...chatMessages, messageData]);
            scrollBottomRef.current.scrollIntoView({ behavior: 'smooth' });
        };

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []) // Empty dependency array ensures this runs only once

    // const handleUserChange = (event) => {
    //     setUser(event.target.value);
    // };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleEnterKey = (event) => {
        if (event.keyCode === ENTER_KEY_CODE) {
            sendMessage();

        }
    };
    const sendMessage = () => {
        if ( message) {
            const messageData = {
                message: message,
                sender_type: 'user', 
                sender_id:31,
                receiver_type:'mentor',
                receiver_id:mentorsignup.value.mentorId,
            };
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
            <ListItemText primary={` ${chatMessageDto.message}`} />
        </ListItem>
    ));

    return (
        <Fragment>
            <UserNav />
            <br />
            <br />
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
                                {/* <FormControl fullWidth>
                                    <TextField
                                        onChange={handleUserChange}
                                        value={user}
                                        label="name"
                                        variant="outlined"
                                    />
                                </FormControl> */}
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        onChange={handleMessageChange}
                                        // onKeyDown={handleEnterKey}
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
            <br />
            <br />
            <UserFooter />
        </Fragment>
    );
};

export default Chat;
