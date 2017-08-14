import * as socketActions from '../actions/ws.js';
import {junkUpdate} from '../actions/index.js';

export default function createSocketMiddleware() {
  let socket = null;

  const onOpen = (token) => evt => {
    console.log('WS is onOpen');
    console.log('token ' + token);
    console.log('evt ' + evt.data);
  };
  const onClose = (store) => evt => {
    console.log('WS is onClose');
    console.log('evt ' + evt.data);
    store.dispatch(socketActions.socketsDisconnect());
  };
  const onMessage = (ws, store) => evt => {
    // Parse the JSON message received on the websocket
    try {
      const data = JSON.parse(evt.data);
      store.dispatch(junkUpdate(data));
    } catch(e){
      console.log(evt)
    }
  };

  return store => next => action => {
    switch (action.type) {
      case 'SOCKETS_CONNECT':
        if (socket !== null) {
          console.log('SOCKETS_DISCONNECTING');
          store.dispatch(socketActions.socketsDisconnecting());
          socket.close();
        }
        console.log('SOCKETS_CONNECTING');
        const HOST = location.origin.replace(/^http/, 'ws')
        socket = new WebSocket(HOST);
        store.dispatch(socketActions.socketsConnecting());
        socket.onmessage = onMessage(socket, store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(action.token);
        break;
      case 'SOCKETS_DISCONNECT':
        if (socket !== null) {
          console.log('SOCKETS_DISCONNECTING');
          store.dispatch(socketActions.socketsDisconnecting());
          socket.close();
        }
        socket = null;
        break;
      case 'SOCKETS_JUNK_SEND':
        console.log('action');
        console.log(action);
        if (socket.readyState === 1) {
          //const data = JSON.stringify({"room": "my", "data": {name: "lol"}, type: "update"})
          const data = JSON.stringify(action.data)
          socket.send(data);
        }
        break;
      case 'JOIN_ROOM':
          console.log('action');
          console.log(action);
          console.log(socket)
          if (socket.readyState === 1 && action.name) {
            const data = JSON.stringify({
              "join": true,
              "host": action.admin,
              "room": action.name})
            socket.send(data);
          }
          break;
      case 'ADD_NPC':
         console.log(store.getState())
         console.log(action)
         break;
      default:
        return next(action);
    }
  };
}
