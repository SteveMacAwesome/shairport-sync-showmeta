import openSocket from 'socket.io-client';
const socket = openSocket('http://hifi.local:3000');

function subscribeToUpdates(fn) {
  socket.on('update', data => {
    fn(null, data)
  });
}
export { subscribeToUpdates };