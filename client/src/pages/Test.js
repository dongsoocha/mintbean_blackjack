import React from 'react';
import { makeStyles, Button } from "@material-ui/core";
import { useUserContext, useUserUpdateContext } from '../contextProvider/user';

const useStyles = makeStyles((theme) => ({
    outer: {
        minHeight: '100vh',
        display: 'flex',
        backgroundImage: `url(${"https://res.cloudinary.com/dqhd5slcy/image/upload/v1627415371/background_dijj6c.png"})`,
        backgroundSize: 'cover'
    },
    container: {
        position: 'relative',
        display: 'flex',
        width: '30%',
        padding: '20px',
        margin: 'auto auto auto auto',
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
    white: {
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
    }
}))

const Test = () => {
    const userState = useUserContext();
    const setUserState = useUserUpdateContext();
    const classes = useStyles();

    return (
        <div className={classes.outer}>
            <div className={classes.container}>
                <div className={classes.inner}>
                    <Button className={classes.button} variant="contained" onClick={() => setUserState((prev) => ({ ...prev, email: "test 1", message: "change email to test 1" }))}>
                        Test 1
                    </Button>
                    <Button className={classes.button} variant="contained" onClick={() => setUserState((prev) => ({ ...prev, username: "test 2", message: "change username to test 2" }))}>
                        Test 2
                    </Button>
                    <Button className={classes.button} variant="contained" onClick={() => console.log(userState)}>
                        Log
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Test;