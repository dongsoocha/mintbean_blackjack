import React from 'react';
import { makeStyles, Box, Divider, Avatar, Typography } from "@material-ui/core";
import Card from './Card';
import { avatarMap } from '../helper/imageMap'
import { useUserContext } from '../contextProvider/user';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        height: '120px',
        width: '84px',
    },
    divider: {
        width: '100%',
        borderTop: '1px solid #ffc400',
    },
    gold: {
        color: '#ffc400'
    },
    row: {
        display: 'flex'
    },
    inner: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}))

const Dealer = (props) => {
    const classes = useStyles();
    const handSize = props.dealer.hand.length;
    const userState = useUserContext();
    return (
        <div className={classes.container}>
            <Box m={3}>
                <div className={classes.inner}>
                    <img src={process.env.PUBLIC_URL + `/assets/deck/${props.dealer.cardBack}.png`} className={classes.card} />
                    <Typography variant="h5" className={classes.gold}>Cards: {43}</Typography>
                </div>
            </Box>
            <Box m={3}>
                <div className={classes.inner}>
                    <Avatar src={avatarMap[props.dealer.avatar]} alt="avatar" className={classes.large} />
                    <Typography variant="h5" className={classes.gold}>{props.dealer.name}</Typography>
                    <Divider className={classes.divider} />
                    <Box m={1}>
                        <div className={classes.row}>
                            {props.dealer.hand && props.dealer.hand.slice(0, handSize - 1).map(card => <Card
                                key={card.id}
                                val={card.val}
                                suit={card.suit}
                                id={card.id}
                                user={props.dealer.name}
                                back={props.dealer.cardBack} />)}
                            <Card
                                key={props.dealer.hand[handSize - 1].id}
                                val={props.dealer.hand[handSize - 1].val}
                                suit={props.dealer.hand[handSize - 1].suit}
                                id={props.dealer.hand[handSize - 1].id}
                                user={userState.username}
                                back={props.dealer.cardBack} />
                        </div>
                    </Box>
                </div>
            </Box>

        </div>
    );
}

export default Dealer;