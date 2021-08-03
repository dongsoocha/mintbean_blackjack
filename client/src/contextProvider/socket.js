import socketio from 'socket.io-client';
import { createContext } from 'react';

export const socket = socketio.connect(3001);
export const SocketContext = createContext();
