import React, { useState, useEffect, useContext } from 'react';
import { Typography, makeStyles, Divider } from "@material-ui/core";
import styled from "styled-components";
import { SocketContext } from '../contextProvider/socket';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    width: '20%',
    padding: '20px',
    margin: '10vh auto 10vh 0',
    boxShadow:
      '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)',
    border: '2px solid #ffc400',
    borderRadius: '10px',
    textAlign: 'center',
    background: 'radial-gradient(circle, rgba(33,33,33,1) 0%, rgba(25,25,25,1) 35%, rgba(0,0,0,1) 100%)',
    minHeight: '80vh',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '0',
      display: 'none'
    },
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  revealed: {
    [theme.breakpoints.down('md')]: {
      position: 'absolute !important',
      zIndex: '2 !important',
      right: '10vw !important',
      padding: '5px !important',
      width: '30% !important',
      display: 'flex !important'
    },
    [theme.breakpoints.down('sm')]: {
      width: '50% !important',
    },
    [theme.breakpoints.down('xs')]: {
      width: '80% !important',
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
    height: '45vh',
    overflow: 'auto',
    width: '100%',
    border: '1px solid #ffc400',
    borderRadius: '10px',
    margin: '25px auto auto auto'
  },
  textbox: {
    width: '100%',
    height: '100px',
    borderRadius: '10px',
    marginTop: '10px',
    paddingLeft: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
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
  width: 100%;
  height: 80px;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
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
  width:  100%;
`;

const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const MyMessage = styled.div`
  width: 45%;
  background-color: #ffc400;
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
  background-color: #ffc400;
  color: lightgray;
  border: 1px solid #ffc400;
  padding: 10px;
  margin-left: 5px;
  text-align: center;
  border-top-left-radius: 10%;
  border-bottom-left-radius: 10%;
`;

const Chat = (props) => {
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
    console.log(props.show)
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  return (
    <div className={classes.container + (props.show ? ` ${classes.revealed}` : "")}>
      <div className={classes.inner}>
        <Typography variant={"h5"} className={classes.gold}>MintJack</Typography>
        <Typography variant={"body2"} className={classes.gold}>Chat</Typography>

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