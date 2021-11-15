import { useRef } from 'react';
import { useSockets } from './context/socket.context';
import RoomsContainer from './containers/Rooms';
import MessagesContainer from './containers/Messages';
import styles from './App.module.css';

function App() {
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef<HTMLInputElement>(null);
  console.log(socket.id);

  function handleSetUsername() {
    if(!usernameRef.current) return;
    setUsername(usernameRef.current.value);
    localStorage.setItem('username',usernameRef.current.value);
  }

  return (
    <div>
      {!username && 
      <div className={styles.usernameWrapper}>
        <div className={styles.usernameInner}>
          <input placeholder="Username" ref={usernameRef} type="text" />
          <button onClick={handleSetUsername}>START</button>
        </div>
      </div>}

      {username && 
        <div className={styles.container}>
          <RoomsContainer />
          <MessagesContainer />
        </div>
      }
    </div>
  );
}

export default App;
