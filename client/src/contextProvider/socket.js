import socketio from 'socket.io-client';
import { createContext } from 'react';

export const socket = socketio.connect("http://mintjack.herokuapp.com/");
export const SocketContext = createContext();
