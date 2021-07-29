import React, { useState } from "react";
import { Typography, makeStyles, Divider, Button } from "@material-ui/core";
import Fade from '@material-ui/core/Fade';
import { Link } from "react-router-dom";

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
        backgroundColor: '#ffc400',
        color: '#212121',
        '&:hover': {
            backgroundColor: '#b28900'
        }
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
    goldSpan: {
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline',
        }
    }

}))

const LandingDefault = (props) => {

    const classes = useStyles();

    return (
        <Fade in={props.checked}>
            <div className={props.checked ? "" : classes.hide}>
                <Typography variant="h4" className={classes.white + " " + classes.m20}>Have an account?</Typography>
                <Button variant="contained" className={classes.landingButton} onClick={() => props.setPage("login")}>Log In</Button>
                <Typography variant="h4" className={classes.white + " " + classes.m20}>Need an account?</Typography>
                <Button variant="contained" className={classes.landingButton} onClick={() => props.setPage("register")}>Register</Button>
                <Divider className={classes.divider} />
                <Typography variant="h4" className={classes.white + " " + classes.m20}>Don't want to register?</Typography>
                <Button variant="contained" className={classes.landingButton} onClick={() => props.setPage("register")}><Link to="/Game">Continue as guest.</Link></Button>
            </div>
        </Fade>
    );
}

export default LandingDefault;