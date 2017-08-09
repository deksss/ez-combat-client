import * as socketActions from '../actions/ws.js';

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
    const msg = evt.data;
    store.dispatch(socketActions.socketsMessageReceiving(msg));
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
      case 'SOCKETS_MESSAGE_SEND':
        console.log('action');
        console.log(action);
        socket.send(action.message_send);
        store.dispatch(socketActions.socketsMessageSending(action.message_send));
        break;
      default:
        return next(action);
    }
  };
}
