import React, { useState } from 'react';
import { Typography, makeStyles, Divider, Button, TextField, Box } from "@material-ui/core";
import Fade from '@material-ui/core/Fade';
import axios from "axios";

const initialRegisterData = {
    registerUsername: "",
    registerEmail: "",
    registerPassword1: "",
    registerPassword2: "",
};

const initialErrors = {
    registerUsername: {
        error: false,
        message: ''
    },
    registerEmail: {
        error: false,
        message: ''
    },
    registerPassword1: {
        error: false,
        message: ''
    },
    registerPassword2: {
        error: false,
        message: ''
    }
}

const useStyles = makeStyles((theme) => ({
    white: {
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
    block: {
        display: 'block'
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

const Register = (props) => {

    const [registerData, setRegisterData] = useState(initialRegisterData);
    const classes = useStyles();
    const [responseMsg, setResponseMsg] = useState({ type: '', message: '' })
    const [errors, setErrors] = useState(initialErrors)


    const handleChange = (event) => {
        const { value, name } = event.target;
        setResponseMsg({ type: '', message: '' })
        if (name === "registerPassword1" || name === 'registerPassword2') {
            setErrors((prevState) => ({
                ...prevState,
                registerPassword1: { error: false, message: '' },
                registerPassword2: { error: false, message: '' },
            }));
        } else {
            setErrors((prevState) => ({ ...prevState, [name]: { error: false, message: '' } }));
        }
        setRegisterData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (registerData.registerUsername && registerData.registerEmail && registerData.registerPassword1 && registerData.registerPassword2) {
            if (registerData.registerPassword1 === registerData.registerPassword2) {
                const reqOps = {
                    method: 'POST',
                    body: {}
                }
                axios
                    .post("http://localhost:5000/api/users/register", {
                        username: registerData.registerUsername,
                        email: registerData.registerEmail,
                        password: registerData.registerPassword1,
                        password2: registerData.registerPassword2
                    })
                    .then((res) => {
                        setRegisterData(initialRegisterData)
                        setResponseMsg({ type: 'success', message: 'Registration successful!' })
                        setErrors(initialErrors)
                    })
                    .catch((err) => {
                        console.log(err.response.data)
                        if (err.response.data.username) {
                            setErrors((prevState) => ({ ...prevState, registerUsername: { error: true, message: "Username already taken!" } }))
                        } else if (err.response.data.email) {
                            setErrors((prevState) => ({ ...prevState, registerEmail: { error: true, message: "Email address already taken!" } }))
                        }
                    })
            } else {
                setErrors((prevState) => ({
                    ...prevState,
                    registerPassword1: { error: true, message: "Passwords do not match!" },
                    registerPassword2: { error: true, message: "Passwords do not match!" }
                }))
            }
        } else {
            console.log("Please fill in all fields.");
        }
    }

    return (
        <Fade in={props.checked}>
            <div className={props.checked ? "" : classes.hide}>
                <form onSubmit={handleSubmit} >
                    <Box>
                        <TextField
                            variant="outlined"
                            className={classes.textField}
                            margin="normal"
                            required
                            id="username"
                            value={registerData.registerUsername}
                            label="Username"
                            name="registerUsername"
                            type="text"
                            error={errors.registerUsername.error}
                            helperText={errors.registerUsername.error ? errors.registerUsername.message : ""}
                            onChange={handleChange}
                            InputProps={{
                                className: classes.white,
                            }}
                            InputLabelProps={{
                                className: classes.white,
                            }}
                        /></Box>
                    <Box m={1}>
                        <TextField
                            variant="outlined"
                            className={classes.textField}
                            margin="normal"
                            required
                            id="email"
                            value={registerData.registerEmail}
                            label="Email Address"
                            name="registerEmail"
                            type="email"
                            onChange={handleChange}
                            error={errors.registerEmail.error}
                            helperText={errors.registerEmail.error ? errors.registerEmail.message : ""}
                            InputProps={{
                                className: classes.white,
                            }}
                            InputLabelProps={{
                                className: classes.white,
                            }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            className={classes.textField}
                            id="password1"
                            value={registerData.registerPassword1}
                            label="Password"
                            name="registerPassword1"
                            type="password"
                            onChange={handleChange}
                            error={errors.registerPassword1.error}
                            helperText={errors.registerPassword1.error ? errors.registerPassword1.message : ""}
                            InputProps={{
                                className: classes.white,
                            }}
                            InputLabelProps={{
                                className: classes.white,
                            }}
                        />
                    </Box>
                    <Box m={1}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            className={classes.textField}
                            id="password2"
                            value={registerData.registerPassword2}
                            label="Confirm Password"
                            name="registerPassword2"
                            type="password"
                            onChange={handleChange}
                            error={errors.registerPassword2.error}
                            helperText={errors.registerPassword2.error ? errors.registerPassword2.message : ""}
                            InputProps={{
                                className: classes.white,
                            }}
                            InputLabelProps={{
                                className: classes.white,
                            }}
                        />
                    </Box>
                    {responseMsg.message && <Typography variant="body2" className={responseMsg.type === "error" ? classes.red : classes.green}>
                        {responseMsg.message}
                    </Typography>}
                    <Box m={2}>
                        <Button variant="contained" type="submit" className={classes.button}>Register</Button>
                    </Box>
                    <Divider className={classes.divider} />
                    <Typography varaint="body2" className={classes.white}>
                        Already have an account? <strong className={classes.signUp} onClick={() => props.setPage("login")}>Sign in!</strong>
                    </Typography>
                    <Typography varaint="body2" className={classes.white}>
                        Don't want to register? <strong className={classes.signUp} onClick={() => props.setPage("default")}>Continue as guest.</strong>
                    </Typography>
                </form>
            </div>
        </Fade>
    );
}

export default Register;