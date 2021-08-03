import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Typography, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    gold: {
        color: '#ffc400',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '20vw',
            overflowX: 'auto',
        },
    },
    exit: {
        position: 'absolute',
        zIndex: '1',
        height: '72px',
        width: '72px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            filter: 'dropShadow(0 0 10px #FF0000)',
            backgroundColor: 'rgb(255,196,0,0.1)'
        },
        [theme.breakpoints.down('xs')]: {
            transform: 'translate(-40px, -30px)',
        },
    },
    exitIcon: {
        width: "36px",
        height: '36px',
        color: '#ffc400',
        display: 'block',
        '&:hover': {
            width: "40px",
            height: '40px',
        }
    },
    shiftLeft: {
        transform: 'translateX(-5px)'
    },
    hover: {
        height: '72px',
        width: '72px',
        '&:hover': {
            filter: 'dropShadow(0 0 10px #FF0000)',
            backgroundColor: 'rgb(255,196,0,0.1)'
        },
    }
}))

const ExitButton = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const returnHome = () => {
        history.push("/home")
    }

    return (
        <IconButton onClick={props.click ? props.click : returnHome} className={classes.hover}>
            <div>
                <img src={`${process.env.PUBLIC_URL}/assets/icon/exit.png`} alt="exit" className={classes.exitIcon} />
                <Typography variant="body2" className={classes.gold + " " + classes.shiftLeft}>Exit</Typography>
            </div>
        </IconButton>
    );
}

export default ExitButton;