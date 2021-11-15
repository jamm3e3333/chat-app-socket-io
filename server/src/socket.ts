import { Server, Socket } from 'socket.io';
import logger from './utils/logger';

const EVENTS = {
    CLIENT: {
        CONNECT: 'connection',
    }
}

const socket = ({io}: {io: Server}) => {
    io.on(EVENTS.CLIENT.CONNECT, (socket: Socket) => {
        logger.info(`Connection: ${socket}`);
    });
}

export default  socket;