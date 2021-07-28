import React, { useState } from 'react';
import { Typography, makeStyles, Divider, Button, TextField, Box } from "@material-ui/core";
import Fade from '@material-ui/core/Fade';

const initialRegisterData = {
    registerUsername: "",
    registerEmail: "",
    registerPassword1: "",
    registerPassword2: "",
};

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
    }
}))

const Register = (props) => {

    const [registerData, setRegisterData] = useState(initialRegisterData);
    const classes = useStyles();


    const handleChange = (event) => {
        const { value, name } = event.target;
        setRegisterData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = () => {

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
                            InputProps={{
                                className: classes.white,
                            }}
                            InputLabelProps={{
                                className: classes.white,
                            }}
                        />
                    </Box>
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