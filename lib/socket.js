import io from 'socket.io-client';

const socket = io('http://192.168.1.119:4000');
// reconnect: true,
// forceNew: true,
export default socket;
