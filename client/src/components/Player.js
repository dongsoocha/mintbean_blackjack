import React from 'react';
import { makeStyles, Box, Divider, Avatar, Typography } from "@material-ui/core";
import { avatarMap } from '../helper/imageMap'
import Card from './Card'

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            minWidth: '50vw',
            borderBottom: '2px solid #ffc400'
        },
        [theme.breakpoints.down('xs')]: {
            minWidth: '60vw'
        },
    },
    divider: {
        width: '100%',
        borderTop: '1px solid #ffc400',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    gold: {
        maxWidth: '8vw',
        overflowX: 'auto',
        color: '#ffc400',
        scrollbarColor: '#424242 #212121',
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
            height: '12px',
            width: '12px',
            background: '#212121',
            borderRadius: '10px'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#424242',
            borderRadius: '10px'
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '20vw',
            fontSize: '18px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '14px'
        },
    },
    row: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {

        },
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        [theme.breakpoints.down('xs')]: {
            width: theme.spacing(6),
            height: theme.spacing(6),
        },
    },
    name: {

    }

}))

const Player = (props) => {

    const classes = useStyles();

    // TODO: Highlight the client's player to differentiate between clients
    // TODO: Map player's cards and pass the card id as a prop to use for images

    return (
        <div className={classes.container}>
            <Box m={1}>
                <div className={classes.row}>
                    {props.hand && props.hand.map(card => <Card
                        key={card.id}
                        val={card.val}
                        suit={card.suit}
                        id={card.id}
                        user={props.name}
                        back={props.cardBack} />)}
                </div>
            </Box>
            <Divider className={classes.divider} />
            <Typography variant="h5" className={classes.gold}>{props.name}</Typography>
            <Avatar src={avatarMap[props.avatar]} alt="avatar" className={classes.avatar} />
        </div>
    );
}

export default Player;