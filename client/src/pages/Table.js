import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useUserContext, useUserUpdateContext } from '../contextProvider/user';
import { SocketContext } from '../contextProvider/socket';
import { makeStyles, Grid, Box } from "@material-ui/core";
import Player from '../components/Player';
import Dealer from '../components/Dealer';

const fakeGame = {
    players: [{
        name: 'Dealer',
        hand: [{ val: '3', suit: 'D', id: '3D' },
        { val: '7', suit: 'S', id: '7S' },],
        avatar: 'a0',
        cardBack: 'a0'
    },
    {
        name: 'Chris',
        hand: [{ val: 'K', suit: 'C', id: 'KC' },
        { val: 'J', suit: 'S', id: 'JS' }],
        avatar: 'a0',
        cardBack: 'a0'
    },
    {
        name: 'Dongsoo',
        hand: [{ val: 'A', suit: 'C', id: 'AC' },
        { val: 'Q', suit: 'C', id: 'QC' },
        { val: '8', suit: 'H', id: '8H' }],
        avatar: 'a0',
        cardBack: 'a0'
    },
    {
        name: 'Fred',
        hand: [{ val: '2', suit: 'D', id: '2D' },
        { val: '5', suit: 'H', id: '5H' }],
        avatar: 'a0',
        cardBack: 'a0'
    },],
    currentPlayer: 1,

}

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        display: 'flex',
        width: '60%',
        padding: '5vh',
        margin: '10vh auto 10vh auto',
        boxShadow:
            '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18)',
        border: '2px solid #ffc400',
        borderRadius: '10px',
        textAlign: 'center',
        background: 'rgb(79,79,79)',
        background: 'radial-gradient(circle, rgba(79,79,79,1) 0%, rgba(42,42,42,1) 35%, rgba(0,0,0,1) 100%)',
        minHeight: '80vh',
        maxHeight: '90%',
        [theme.breakpoints.down('md')]: {
            width: '70%',
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
        minHeight: '35vh',
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
    }
}))

const Table = () => {

    const [gameState, setGameState] = useState(fakeGame) // Temp game
    const userState = useUserContext();
    const setUserState = useUserUpdateContext();
    const classes = useStyles();
    const socket = useContext(SocketContext);
    const history = useHistory();
    const [clientTurn, setClientTurn] = useState(false) // State for if it is the client's turn

    useEffect(() => {
        // TODO: On mount retrieve game state from socket
        // TODO: Check for emitions for updating game state
    }, [])

    const playerMove = (move) => {
        // TODO: move will be a string for hit/stand, then pass that into the socket to emit
    }

    // TODO: Have a MUI modal with buttons for hit/stand. Modal is active if clientTurn is true 
    // TODO: Have text somewhere indicating who's turn it is.
    // TODO: Spectator list? Text indicating a new person joined the table / room.

    // Components that will be used here:
    // Players will get mapped around the table (try to space evenly)
    // Players will have card components as children
    // Chat component will be on the side?

    return (
        <div className={classes.container}>
            <div className={classes.inner}>
                <div className={classes.row}>
                    <div className={classes.dealer}>
                        {gameState.players && <Dealer dealer={gameState.players[0]} />}
                    </div>
                </div>
                <div className={classes.row + " " + classes.players}>
                    {gameState.players && gameState.players.slice(1).map(player =>
                        <div className={classes.players} key={player.name}>
                            <Player name={player.name} hand={player.hand} avatar={player.avatar} cardBack={player.cardBack} />
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

export default Table;