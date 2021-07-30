import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Typography, makeStyles, Divider, Button, TextField, Box } from "@material-ui/core";
import Fade from '@material-ui/core/Fade';
import axios from "axios";
import { useUserContext, useUserUpdateContext } from '../contextProvider/user';

const initialLogInData = {
    signInEmail: "",
    signInPassword: "",
};

const useStyles = makeStyles((theme) => ({
    gold: {
        color: '#ffc400'
    },
    m20: {
        marginTop: '20px',
        marginBottom: '20px'
    },
    landingButton: {
        width: '100px',
    },
    divider: {
        width: '50%',
        borderTop: '1px solid #ffc400',
        marginTop: '30px',
        marginBottom: '30px',
        marginLeft: '25%'
    },
    hide: {
        display: 'none',
        transition: 'opacity 1s ease-out'
    },
    textField: {
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffc400",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffc400",
        },
        "&:hover .MuiInputLabel-outlined": {
            color: "#ffc400",
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#ffc400",
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffc400"
        },
    },
    button: {
        backgroundColor: '#ffc400',
        color: '#212121',
        '&:hover': {
            backgroundColor: '#b28900'
        }
    },
    signUp: {
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline',
        }
    },
    red: {
        color: '#ff1744'
    },
    green: {
        color: '#4caf50'
    }
}))

const Login = (props) => {
    const [logInData, setLogInData] = useState(initialLogInData);
    const [responseMsg, setResponseMsg] = useState({
        type: '',
        message: '',
    })
    const classes = useStyles();
    const history = useHistory();
    const userState = useUserContext();
    const setUserState = useUserUpdateContext();

    const handleChange = (event) => {
        setResponseMsg({ type: '', message: '' })
        const { value, name } = event.target;
        setLogInData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (logInData.signInEmail && logInData.signInPassword) {
            axios
                .post('http://localhost:5000/api/users/login', {
                    email: logInData.signInEmail,
                    password: logInData.signInPassword,
                })
                .then((res) => {
                    setLogInData(initialLogInData)
                    setResponseMsg({ type: 'success', message: 'Log in successful!' })
                    setUserState({ ...res.data.payload, isAuth: true, currentMatchId: '' })
                    setTimeout(() => {
                        history.push("/home")
                    }, 1000)
                })
                .catch((err) => {
                    err.response.data.email ? setResponseMsg({ type: 'error', message: 'This user does not exist!' }) : setResponseMsg({ type: 'error', message: 'Incorrect password!' })
                })
        } else {
            console.error("Please fill in all fields.");
        }
    }

    return (
        <Fade in={props.checked}>
            <div className={props.checked ? "" : classes.hide}>
                <form onSubmit={handleSubmit} >
                    <Box m={1}>
                        <TextField
                            variant="outlined"
                            className={classes.textField}
                            margin="normal"
                            required
                            id="email"
                            value={logInData.signInEmail}
                            label="Email Address"
                            name="signInEmail"
                            type="email"
                            onChange={handleChange}
                            InputProps={{
                                className: classes.gold,
                            }}
                            InputLabelProps={{
                                className: classes.gold,
                            }}
                        />
                    </Box>
                    <Box m={1}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            className={classes.textField}
                            id="password"
                            value={logInData.signInPassword}
                            label="Password"
                            name="signInPassword"
                            type="password"
                            onChange={handleChange}
                            InputProps={{
                                className: classes.gold,
                            }}
                            InputLabelProps={{
                                className: classes.gold,
                            }}
                        />
                    </Box>
                    {responseMsg.message && <Typography variant="body2" className={responseMsg.type === "error" ? classes.red : classes.green}>
                        {responseMsg.message}
                    </Typography>}
                    <Box m={3}>
                        <Button variant="contained" type="submit" className={classes.button}>Login</Button>
                    </Box>
                    <Divider className={classes.divider} />
                    <Typography varaint="body2" className={classes.gold}>
                        Don't have an account? <strong className={classes.signUp} onClick={() => props.setPage("register")}>Sign up!</strong>
                    </Typography>
                </form>
            </div>
        </Fade>
    );
}

export default Login;