import React from 'react';
import { useHistory } from 'react-router-dom';
import { useUserContex, useUserUpdateContex } from '../contextProvider/user';
import { SocketContext } from '../ContextProvider/socket';

const Home = () => {

    const userState = useUserContex();
    const setUserState = useUserUpdateContex();
    const classes = useStyles();
    const socket = useContext(SocketContext);
    const history = useHistory();

    const joinRoom = () => {
        // TODO: socket emit to join the room with user id
    }

    return (
        <div>
            <h1>Home page after logging in.</h1>
            {userState.username && <h2>Welcome back {userState.username}!</h2>}
        </div>
    );
}

export default Home;