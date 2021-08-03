import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, makeStyles, Divider, Button, Box, Avatar } from "@material-ui/core";
import { useUserContext, useUserUpdateContext } from '../contextProvider/user';
import { SocketContext } from '../contextProvider/socket';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { avatarMap } from '../helper/imageMap'
import axios from 'axios';

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
        [theme.breakpoints.down('md')]: {
            width: '50%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '80%',
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
    landingButton: {
        width: '100px',
    },
    inner: {
        margin: 'auto'
    },
    m20: {
        marginTop: '20px',
        marginBottom: '20px'
    },
    button: {
        width: '150px',
    },
    buttonGold: {
        backgroundColor: '#ffc400',
        color: '#212121',
        '&:hover': {
            backgroundColor: '#b28900'
        }
    },
    buttonGoldOutlined: {
        marginTop: '5px',
        borderColor: '#ffc400',
        color: '#ffc400',
        '&:hover': {
            backgroundColor: '#b28900'
        }
    },
    buttonLogout: {
        backgroundColor: '#f44336',
        color: '#212121',
        '&:hover': {
            backgroundColor: '#aa2e25'
        }
    },
    buttonWhite: {
        backgroundColor: '#e0e0e0',
        color: '#212121',
        '&:hover': {
            backgroundColor: '#9e9e9e'
        }
    },
    buttonL: {
        width: '250px',
        height: '60px',
        backgroundColor: '#4caf50',
        color: '#212121',
        '&:hover': {
            backgroundColor: '#357a38'
        }
    },
    shiftDown: {
        transform: 'translateY(3px)'
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}))

const Home = () => {

    // TODO: Make this a protected route

    const userState = useUserContext();
    const setUserState = useUserUpdateContext();
    const classes = useStyles();
    const socket = useContext(SocketContext);
    const history = useHistory();
    const [ownedAvatars, setOwnedAvatars] = useState([])

    const joinRoom = () => {
        // TODO: Socket emit to join the room with user id
        history.push('/table')
    }

    const reload = () => {
        // TODO: Give user 500 credits if they hit 0
    }

    const logout = () => {
        // TODO: Properly logout
        setUserState({
            isAuth: false,
            id: '',
            username: '',
            email: '',
            currentMatchId: '',
            balance: 0,
            avatar: '',
            cardBack: '',
        })
        history.push("/")
    }

    useEffect(() => {
        if (userState.username) {
            axios
                .get("http://localhost:5000/api/users/get-owned-avatars", {
                    params: {
                        email: userState.email
                    },
                })
                .then(res => {
                    setOwnedAvatars(res.data.avatar.owned)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [userState])

    const recharge = () => {
        if (userState.username) {
            axios
                .post("http://localhost:5000/api/users/recharge", {
                    email: userState.email,
                })
                .then(res => {
                    setUserState({ ...res.data.payload, isAuth: true, currentMatchId: '' })
                })
                .catch(err => { console.log(err) })
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.inner}>
                <Typography variant="h2" className={classes.gold}>MintJack</Typography>
                <Typography variant="body2" className={classes.gold}>An online multiplayer web app</Typography>
                <Divider className={classes.divider} />
                <Box display="flex" justifyContent="center">
                    <Avatar src={userState.avatar ? avatarMap[userState.avatar].src : null} alt="avatar" className={classes.large} />
                </Box>

                <Typography variant="h3" className={classes.gold}>Welcome back, {userState.username}!</Typography>
                <Typography variant="h6" className={classes.gold}>Your Balance: <MonetizationOnIcon className={classes.shiftDown} />{userState.balance}</Typography>
                {userState.balance === 0 && <Button
                    variant="outlined"
                    size="small"
                    className={classes.buttonGoldOutlined}
                    onClick={recharge}
                >
                    Recharge
                </Button>}
                <Divider className={classes.divider} />
                <Box component="div" display="block" m={3}>
                    <Button variant="contained" className={classes.buttonL} onClick={joinRoom}>Enter Game Room</Button>
                </Box>
                <Box component="div" display="block" m={3}>
                    <Button variant="contained" className={classes.button + " " + classes.buttonWhite} onClick={() => console.log(avatarMap[userState.avatar])}>How To Play</Button>
                </Box>
                <Box component="div" display="block" m={3}>
                    <Button variant="contained" className={classes.button + " " + classes.buttonGold} onClick={() => history.push("/store")}>Store</Button>
                </Box>
                <Box component="div" display="block" m={3}>
                    <Button variant="contained" className={classes.buttonLogout + " " + classes.button} onClick={logout}>Logout</Button>
                </Box>

            </div>
        </div >
    );
}

export default Home;