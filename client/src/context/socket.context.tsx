import { createContext, useContext } from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/default';
import { useState } from 'react';
import EVENTS from '../config/events';

interface Context {
    socket: Socket;
    username?: string;
    setUsername: Function;
    roomId?: string;
    rooms: Record<string, {name: string}>;
    messages?: any[];
    setMessages: Function;
}
const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
    socket, 
    setUsername: () => false,
    rooms: {},
    setMessages: () => false,
});

 function SocketsProvider(props: any) {
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');
    const [rooms, setRooms] = useState({});
    const [messages, setMessages] = useState([]);

    socket.on(EVENTS.SERVER.ROOMS, (value) => {
        setRooms(value);
    });

    socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
        setRoomId(value);
        setMessages([]);
    })

    return (
        <SocketContext.Provider
            value={{
                socket, 
                username, 
                setUsername,
                roomId,
                rooms,
                messages, 
                setMessages,
            }}
            {...props}
        />
    )
 }

export const useSockets =  () => useContext(SocketContext);

export default SocketsProvider;