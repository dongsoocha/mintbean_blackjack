import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useUserContext, useUserUpdateContext } from '../contextProvider/user';
import { SocketContext } from '../contextProvider/socket';
import { makeStyles, Typography, Button, Box, IconButton } from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import Player from '../components/Player';
import Dealer from '../components/Dealer';
import Chat from '../components/Chat';
import ExitButton from '../components/ExitButton';
import Countdown from 'react-countdown';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        display: 'flex',
        width: '60%',
        padding: '5vh',
        margin: '10vh 0 10vh auto',
        boxShadow:
            '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)',
        border: '2px solid #ffc400',
        borderRadius: '10px',
        textAlign: 'center',
        background: 'radial-gradient(circle, rgba(33,33,33,1) 0%, rgba(25,25,25,1) 35%, rgba(0,0,0,1) 100%)',
        minHeight: '80vh',
        maxHeight: '90%',
        [theme.breakpoints.down('md')]: {
            width: '80%',
            marginRight: 'auto'
        },
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
    },
    inner: {
        margin: 'auto',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative'
    },
    row: {
        minHeight: '30vh',
        minWidth: '100%',
        padding: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    players: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    dealer: {
        color: 'gold',
        padding: 5,
        dsiplay: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    player: {
        color: 'white',
        padding: 5,
        dsiplay: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    turn: {
        minHeight: '10vh',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center'
    },
    gold: {
        color: '#ffc400',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '20vw',
            overflowX: 'auto',
            fontSize: '18px'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '14px'
        },
    },
    buttonRed: {
        backgroundColor: '#f44336',
        color: '#212121',
        '&:hover': {
            backgroundColor: '#aa2e25'
        }
    },
    buttonGreen: {
        backgroundColor: '#4caf50',
        color: '#212121',
        '&:hover': {
            backgroundColor: '#357a38'
        }
    },
    row2: {
        display: 'flex',
        flexDirection: 'row',
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
    outer: {
        display: 'flex',
        maxHeight: '100vh',
        [theme.breakpoints.down('sm')]: {
            maxHeight: 'none',
        },
    },
    icon: {
        width: "36px",
        height: '36px',
        color: '#ffc400',
        display: 'block',
        '&:hover': {
            width: "40px",
            height: '40px',
        }
    },
    exit: {
        position: 'absolute',
        zIndex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            transform: 'translate(-40px, -30px)',
        },
    },
    chat: {
        position: 'absolute',
        zIndex: '3',
        right: '4vh',
        height: '72px',
        width: '72px',
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            filter: 'dropShadow(0 0 10px #FF0000)',
            backgroundColor: 'rgb(255,196,0,0.1)'
        },
        [theme.breakpoints.down('md')]: {
            display: 'flex',
        },
        [theme.breakpoints.down('xs')]: {
            transform: 'translate(35px, -30px)',
        },
    },
    shiftUpRight: {
        right: '4vh',
        [theme.breakpoints.down('md')]: {
            right: '1vh',
            top: '1vh'
        },
        [theme.breakpoints.down('xs')]: {
            right: '4vh',
            top: '4vh'
        },
    },
    name: {
        minWidth: '40vw',
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
    },
}))

const Table = () => {

    const [gameState, setGameState] = useState(null) // Temp game
    const [showChatSmallScreen, setShowChatSmallScreen] = useState(false)
    const userState = useUserContext();
    const classes = useStyles();
    const socket = useContext(SocketContext);
    const history = useHistory();
    const startDate = useRef(Date.now());

    useEffect(() => {
        if (!gameState) {
            socket.emit('join-room', {
                player: {
                    name: userState.username,
                    hand: [],
                    avatar: userState.avatar,
                    cardBack: 'a0'
                }
            })
        }
        socket.on('update-game-state', (game) => {
            console.log(game)
            setGameState(game);
        });
        // socket.on('update-timer', () => {
        //     //console.log("Updating timer")
        //     console.log("ccc")
        //     console.log(gameState)
        //     startDate.current = Date.now()
        // });
        // socket.on('update-game-state-and-timer', (game) => {
        //     //console.log("Updating timer")
        //     console.log(game)
        //     console.log(gameState)
        //     startDate.current = Date.now()
        //     setGameState(game);
        // });
        // socket.on(`force-player-to-stand-${userState.username}`, () => {
        //     console.log(userState.username)
        //     stand()
        // });
        return () => {
            socket.emit('leave-room', {
                player: {
                    name: userState.username,
                    hand: [],
                    avatar: userState.avatar,
                    cardBack: 'a0'
                }
            })
            socket.removeAllListeners()
        }
    }, [])

    // TODO: Spectator list? Text indicating a new person joined the table / room.

    const renderTurn = () => {

        if (!gameState.inProgress) {
            return <Typography variant="h5" className={classes.gold + " " + classes.name}>Game Over! <Button variant="contained" className={classes.buttonGreen} onClick={restart}>Restart</Button></Typography>

        }

        return gameState.players[gameState.currentPlayer].name === userState.username ? <div className={classes.row2}>
            <Typography variant="h5" className={classes.gold} > Your Turn:</Typography>
            <Box display="inline" component="div" m={1} p={1}>
                <Button variant="contained" className={classes.buttonGreen} onClick={hit}>
                    Hit
                </Button>
            </Box>
            <Typography variant="h5" className={classes.gold}>or</Typography>
            <Box display="inline" component="div" m={1} p={1}>
                <Button variant="contained" className={classes.buttonRed} onClick={stand}>
                    Stand
                </Button>
            </Box>
        </div>
            :
            <Typography variant="h5" className={classes.gold + " " + classes.name}>It is currently {gameState.players[gameState.currentPlayer].name}'s turn.</Typography>
    }

    const countDownRender = ({ seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return null
        } else {
            // Render a countdown
            return <Typography variant="h5" className={classes.gold} display="inline">{seconds}s</Typography>;
        }
    };

    const test1 = () => {
        socket.emit("start-game")
    }

    const restart = () => {
        socket.emit("restart-game")
    }

    const hit = () => {
        socket.emit("hit")
    }

    const stand = () => {
        socket.emit("stand")
    }

    const leaveRoom = () => {
        // TODO: Remove player from the game
        history.push("/home")
    }

    const toggleChatSmallScreen = () => {
        setShowChatSmallScreen(prevState => !prevState)
    }

    return (
        <div className={classes.outer}>
            <div className={classes.container}>
                <Box className={classes.exit} >
                    <ExitButton click={leaveRoom} />
                </Box>
                <IconButton className={classes.chat + (showChatSmallScreen ? ` ${classes.shiftUpRight}` : "")} onClick={toggleChatSmallScreen}>
                    <div>
                        <ChatIcon className={classes.icon} />
                        <Typography variant="body2" className={classes.gold}>Chat</Typography>
                    </div>
                </IconButton>
                <div className={classes.inner}>
                    <div className={classes.row}>
                        <div className={classes.dealer}>
                            {gameState && <Dealer dealer={gameState.players[gameState.players.length - 1]} deckSize={gameState.deckSize} inProgress={gameState.inProgress} />}
                        </div>
                    </div>
                    <div className={classes.turn}>
                        {gameState && renderTurn()}
                    </div>
                    <div className={classes.row + " " + classes.players}>
                        {gameState && gameState.players.slice(0, gameState.players.length - 1).map(player =>
                            <div className={classes.players} key={player.name}>
                                <Player name={player.name} hand={player.hand} avatar={player.avatar} cardBack={player.cardBack} result={player.result ? player.result : ''} />
                            </div>
                        )}
                    </div>
                </div>
            </div >
            <Chat show={showChatSmallScreen} />
        </div>

    );
}

export default Table;