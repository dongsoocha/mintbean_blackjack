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

    useEffect(() => {
        // TODO: On mount retrieve game state from socket
        // TODO: Check for emitions for updating game state
    }, [])

    return (
        <div>
            <h1>Game Table</h1>
        </div>
    );
}

export default Table;