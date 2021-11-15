import { useRef } from 'react';
import { useSockets } from '../context/socket.context';
import EVENTS from '../config/events';

function RoomsContainer() {
    const { socket, roomId, rooms } = useSockets();
    const newRoomRef = useRef<HTMLInputElement>(null);

    function handleCreateRoom() {
        //get the room name
        if(!newRoomRef.current?.value.trim()) return;
        const roomName = newRoomRef.current.value || '';


        //emit room create event
        socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName});

        //set room name input to empty string
        newRoomRef.current.value = '';

    }

    return (
        <nav>
            <div>
                <input 
                    type="text" 
                    placeholder="Room name" 
                    ref={newRoomRef} 
                />
                <button onClick={handleCreateRoom}>CREATE ROOM</button>
            </div>
            {Object.keys(rooms).map(value => {
                return <div key={value}>{rooms[value].name}</div>
            })}
        </nav>
    )
}

export default RoomsContainer;