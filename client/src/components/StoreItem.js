import React from 'react';
import { Avatar, Typography, Box, makeStyles } from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const useStyles = makeStyles((theme) => ({
    shiftDown: {
        transform: 'translateY(3px)'
    },
    gold: {
        color: '#ffc400'
    },
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    container: {
        border: '1px solid transparent ',
        borderRadius: '3px',
        '&:hover': {
            border: '1px solid #ffc400',
            borderRadius: '3px'
        }
    }
}))

const StoreItem = (props) => {

    const classes = useStyles()

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            padding={1}
            margin={1}
            className={classes.container}
        >
            <Avatar src={props.src} className={classes.large} />
            {props.owned ?
                <Typography variant="h6" className={classes.gold}>Owned</Typography>
                :
                <Typography variant="h6" className={classes.gold}>
                    <MonetizationOnIcon className={classes.shiftDown} />
                    {props.cost}
                </Typography>}
        </Box>
    );
}

export default StoreItem;