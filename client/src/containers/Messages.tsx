import { useRef } from 'react';
import { useSockets } from '../context/socket.context';
import EVENTS from '../config/events';

function MessagesContainer() {
    const { socket, messages, roomId, username, setMessages } = useSockets();
    const messageRef = useRef<HTMLTextAreaElement>(null);

    function handleSendMessage() {
        if(!messageRef.current) return;

        socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {
            roomId, 
            message: messageRef.current.value,
            username
        });

        const date = new Date();

        if(messages) {
            setMessages([
                ...messages, {
                    username: 'You',
                    message: messageRef.current.value,
                    time: `${date.getHours()}:${date.getMinutes()}`
                }
            ]);
        }
    }

    if(!roomId) return <div></div>;

    return (
        <div>
            {messages?.map((message, i) => {
                return <p key={i}>{JSON.stringify(message)}</p>
            })}

            <div>
                <textarea 
                    rows={1}
                    placeholder="Tess us what are you thinking"
                    ref={messageRef}
                />
                <button onClick={handleSendMessage}>SEND</button>
            </div>
        </div>
    )
}

export default MessagesContainer;