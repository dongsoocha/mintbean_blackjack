import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUserContex, useUserUpdateContex } from '../contextProvider/user';
import { SocketContext } from '../ContextProvider/socket';

const Table = () => {

    const [gameState, setGameState] = useState({})
    const userState = useUserContex();
    const setUserState = useUserUpdateContex();
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
        <div>
            <h1>Game Table</h1>
        </div>
    );
}

export default Table;