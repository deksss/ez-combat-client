import * as socketActions from '../actions/ws.js';
import {junkUpdate} from '../actions/index.js';

const sendUpsertToServer = (socket, store) => {
  console.log(socket)
  if (socket && socket.readyState === 1) {
    const allData = store.getState()
    const curRoom = allData.rooms.currentId;
    const dataForSend = {
      data: {
        npcs:  allData.npcs.filter(npc => npc.parentId === curRoom),
        players: allData.players.filter(player => player.parentId === curRoom)
      },
      type: "update",
      room: curRoom,
    }

    const data = JSON.stringify(dataForSend)
    console.log(data)
    socket.send(data);
  }
}

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

    if (evt && evt.data === 'ping') {
      ws.send('pong')
    } else {
      try {
        const data = JSON.parse(evt.data);
        store.dispatch(junkUpdate(data));
      } catch(e){
        console.log(evt)
        console.log(e)
      }
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
        socket.onopen = onOpen();
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
          console.log('try send')
          sendUpsertToServer(socket, store)
        break;
      case 'JOIN_ROOM':
          console.log('action');
          console.log(action);
          console.log(socket)
          if (socket && socket.readyState === 1 && action._id) {
            const data = JSON.stringify({
              "join": true,
              "host": action.owner_code,
              "room": action._id,
              "name": action.name
            })
            socket.send(data);
          }
          break;
      default:
        return next(action);
    }
  };
}
