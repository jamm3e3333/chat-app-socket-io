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

export default EVENTS;