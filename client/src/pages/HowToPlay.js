import React from 'react';
import { makeStyles, Typography, Divider, Button, } from "@material-ui/core";
import { useHistory } from "react-router-dom";

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
        background: 'radial-gradient(circle, rgba(33,33,33,1) 0%, rgba(25,25,25,1) 35%, rgba(0,0,0,1) 100%)',
        minHeight: '80vh',
        maxHeight: '90%',
        [theme.breakpoints.down('xl')]: {
            width: '60%',
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
    inner: {
        margin: 'auto',
        marginTop: '30px',
        marginBottom: '30px'
    },
    image: {
        marginTop: '30px',
        marginBottom: '30px'
    },
    margin: {
        marginTop: '30px',
        marginBottom: '30px'
    }
}))

const HowToPlay = () => {

    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.container}>
            <div className={classes.inner}>
                <Typography variant="h2" className={classes.gold}>MintJack</Typography>
                <Typography variant="h4" className={classes.gold}>Chat</Typography>
                <Divider className={classes.divider} />
                <div className={classes.margin}>
                    <Typography variant="h4" className={classes.gold}>How to play Blackjack.</Typography>
                </div>
                <Typography variant="h5" className={classes.gold}>Beat the Dealer.</Typography>
                <Typography variant="h6" className={classes.gold}>By drawing a hand value that is higher than the dealer’s hand value</Typography>
                <Typography variant="h6" className={classes.gold}>By the dealer drawing a hand value that goes over 21.</Typography>
                <Typography variant="h6" className={classes.gold}>By drawing a hand value of 21 on your first two cards, when the dealer does not.</Typography>

                <div className={classes.image}>
                    <img src={process.env.PUBLIC_URL + 'assets/howtoplay/howtoplay.png'} />
                </div>
                <div className={classes.margin}>
                    <Typography variant="h5" className={classes.gold}>Hit or Stand.</Typography>
                </div>
                <Typography variant="h6" className={classes.gold}>Hit if you want to take another card</Typography>
                <Typography variant="h6" className={classes.gold}>Stand if you don't want to take no more cards; also known as "stand pat", "stick", or "stay".</Typography>
                <Button variant="contained" onClick={() => history.push("/home")}>Return Home</Button>
            </div>
        </div>
    )
}

export default HowToPlay
