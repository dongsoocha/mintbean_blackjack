import React from 'react';
import { makeStyles } from "@material-ui/core";
import { useUserContext } from '../contextProvider/user';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        height: '120px',
        width: '84px',
        position: 'relative',
        marginLeft: '-50px',
        transform: 'translateX(25px)',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '-65px',
            transform: 'translateX(35px)'
        },

    }
}))

const Card = (props) => {

    const classes = useStyles();
    const userState = useUserContext();

    // TODO: Use the id in the props to retrieve the image file
    // TODO: Need to make sure players can't see each other's card, maybe add a field in the card for player id and pass to the props
    // then check if the player id matches the id in the user context, if it does, render the card image, otherwise render the card back

    return (
        <div className={classes.container}>
            <img src={process.env.PUBLIC_URL + `/assets/deck/${props.hidden ? props.back : props.id}.png`} className={classes.card} />
        </div>
    );
}

export default Card;