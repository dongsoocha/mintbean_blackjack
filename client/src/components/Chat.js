import React, { useState, useEffect, useContext } from 'react';
import { Typography, makeStyles, Divider } from "@material-ui/core";
import styled from "styled-components";
import { SocketContext } from '../contextProvider/socket';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    width: '30%',
    padding: '20px',
    margin: '10vh auto auto auto',
    boxShadow:
      '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)',
    border: '2px solid #ffc400',
    borderRadius: '10px',
    textAlign: 'center',
    backgroundColor: '#212121',
    minHeight: '80vh',
    maxHeight: '90%',
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  gold: {
    color: '#ffc400'
  },
  divider: {
    width: '50%',
    borderTop: '1px solid #ffc400',
    marginTop: '30px',
    marginBottom: '30px',
    marginLeft: '25%'
  },
  landingButton: {
    width: '100px',
  },
  inner: {
    margin: 'auto'
  },
  m30: {
    marginTop: '20px',
    marginBottom: '20px'
  },
  button: {
    backgroundColor: '#ffc400',
    color: '#212121',
    '&:hover': {
      backgroundColor: '#b28900'
    }
  },
  chatbox: {
    display: 'flex',
    flexDirection: 'column',
    height: '500px',
    maxHeight: '500px',
    overflow: 'auto',
    width: '400px',
    border: '1px solid #ffc400',
    borderRadius: '10px',
    marginTop: '25px'
  },
  textbox: {
    width: '98%',
    height: '100px',
    borderRadius: '10px',
    marginTop: '10px',
    paddingLeft: '10px',
    paddingTop: '10px',
    fontSize: '17px',
    backgroundColor: 'transparent',
    border: '1px solid #ffc400',
    outline: 'none',
    color: 'lightgray',
    letterSpacing: '1px',
    lineHeight: '20px'
  }
}))

const TextArea = styled.textarea`
  width: 98%;
  height: 100px;
  border-radius: 10px;
  margin-top: 10px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 17px;
  background-color: transparent;
  border: 1px solid #ffc400;
  outline: none;
  color: lightgray;
  letter-spacing: 1px;
  line-height: 20px;
  ::placeholder {
    color: lightgray;
  }
`;

const Button = styled.button`
  background-color: #ffc400;
  width: 100%;
  border: none;
  height: 50px;
  border-radius: 10px;
  color: #46516e;
  font-size: 17px;
`;

const Form = styled.form`
  width: 400px;
`;

const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const MyMessage = styled.div`
  width: 45%;
  background-color: pink;
  color: #46516e;
  padding: 10px;
  margin-right: 5px;
  text-align: center;
  border-top-right-radius: 10%;
  border-bottom-right-radius: 10%;
`;

const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`;

const PartnerMessage = styled.div`
  width: 45%;
  background-color: transparent;
  color: lightgray;
  border: 1px solid lightgray;
  padding: 10px;
  margin-left: 5px;
  text-align: center;
  border-top-left-radius: 10%;
  border-bottom-left-radius: 10%;
`;

const Chat = () => {
  const classes = useStyles();
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socket = useContext(SocketContext);

  useEffect(() => {

    socket.on("your id", id => {
      setYourID(id);
    })

    socket.on("message", ({ messageObject }) => {
      console.log("here");
      receivedMessage(messageObject);
    })
  }, []);

  function receivedMessage(message) {
    setMessages(oldMsgs => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: yourID,
    };
    setMessage("");
    socket.emit("send message", { messageObject });
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <Typography variant="h2" className={classes.gold}>MintJack</Typography>
        <Typography variant="h4" className={classes.gold}>Chat</Typography>

        <div className={classes.chatbox}>
          {messages.map((message, index) => {
            if (message.id === yourID) {
              return (
                <MyRow key={index}>
                  <MyMessage>
                    {message.body}
                  </MyMessage>
                </MyRow>
              )
            }
            return (
              <PartnerRow key={index}>
                <PartnerMessage>
                  {message.body}
                </PartnerMessage>
              </PartnerRow>
            )
          })}
        </div>
        <Form onSubmit={sendMessage}>
          <TextArea value={message} onChange={handleChange} placeholder="Say something..." />
          <Button>Send</Button>
        </Form>
      </div>
    </div>
  );
};

export default Chat;