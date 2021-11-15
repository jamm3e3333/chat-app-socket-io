import { Server, Socket } from 'socket.io';
import logger from './utils/logger';
import { nanoid } from 'nanoid';

const EVENTS = {
    CONNECT: 'connection',
    CLIENT: {
        CREATE_ROOM: 'create_room',
        SEND_ROOM_MESSAGE: 'send_room_message',
    },
    SERVER: {
        ROOMS: 'rooms',
        JOINED_ROOM: 'joined_room',
        ROOM_MESSAGE: 'room_message',
    },
}

const rooms: Record<string, {name: string}> = {};

const socket = ({io}: {io: Server}) => {
    io.on(EVENTS.CONNECT, (socket: Socket) => {
        logger.info(`Connection: ${socket.id}`);

        //when a user creates a new room
        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({roomName}) => {
            
            //create a roomId
            const roomId = nanoid();
            
            //add a new room to the rooms object
            rooms[roomId] = {
                name: roomName,
            }
            
            //socket.join(roomId)
            socket.join(roomId);
    
            //broadcast an event saying there is a new room
            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);
    
            //emit back to the room creator with all the rooms
            socket.emit(EVENTS.SERVER.ROOMS, rooms);

            //emit event back to the room creator saying they have joined the room
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
        });

        //when a user sends a new message
        socket.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, ({roomId, message, username}) => {
            const date = new Date();

            socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
                message,
                username,
                time: `${date.getHours()}:${date.getMinutes()}`,
            })
        })

    });
}

export default socket;