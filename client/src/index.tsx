import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SocketProvider from './context/socket.context';

ReactDOM.render(
  <SocketProvider>
    <App />
  </SocketProvider>,
  document.getElementById('root')
);

