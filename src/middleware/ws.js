import * as socketActions from "../actions/ws.js";
import { junkUpdate } from "../actions/index.js";

const getCurRoomDataForClient = (allData, wsId) => ({
  data: {
    npcs: allData.npcs.filter(npc => npc.parentId === allData.rooms.currentId),
    players: allData.players.filter(
      player => player.parentId === allData.rooms.currentId
    ),
    rolls: allData.rolls
  },
  type: "data_for_client",
  wsId: wsId,
  room: allData.rooms.currentId
});

const sendDataToClient = (socket, store, wsId) => {
  if (socket && socket.readyState === 1) {
    const allData = store.getState();
    const dataForSend = getCurRoomDataForClient(allData, wsId);
    const data = JSON.stringify(dataForSend);
    socket.send(data);
    return Date.now();
  }
  return 0;
};

const sendActionToServer = (socket, action, room) => {
  if (socket && socket.readyState === 1) {
    const dataObj = {
      type: "action",
      action: action,
      room: room
    };
    const dataStr = JSON.stringify(dataObj);
    socket.send(dataStr);
    return Date.now();
  }
  return 0;
};

export default function createSocketMiddleware() {
  const MIN_DELAY = 1000;
  let socket = null;
  let prevSendTime = 0;

  const onOpen = token => evt => {
    console.log("WS is onOpen");
    console.log("token " + token);
    console.log("evt " + evt.data);
  };
  const onClose = store => evt => {
    console.log("WS is onClose");
    console.log("evt " + evt.data);
    store.dispatch(socketActions.socketsDisconnect());
  };
  const onMessage = (ws, store) => evt => {
    if (evt && evt.data === "ping") {
      ws.send("pong");
    } else {
      try {
        const data = JSON.parse(evt.data);
        if (data.remote) {
          const actionLocal = Object.assign({}, data.action, {
            toServer: false
          });
          console.log(actionLocal);
          store.dispatch(actionLocal);
          //store.dispatch(junkSend());
        } else if (data.getAll) {
          console.log("try to send all data to client");
          sendDataToClient(socket, store, data.wsId);
        } else if (data.update) {
          store.dispatch(junkUpdate(data));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return store => next => action => {
    if (action && action.toServer) {
      console.log("try send action");
      const timeDiffAction = Date.now() - prevSendTime;
      const delayAction =
        timeDiffAction > MIN_DELAY ? 0 : MIN_DELAY - timeDiffAction;

      setTimeout(() => {
        let curRoomID = store.getState().rooms.currentId;
        prevSendTime = sendActionToServer(socket, action, curRoomID);
      }, delayAction);
    }
    switch (action.type) {
      case "SOCKETS_CONNECT":
        if (socket !== null) {
          console.log("SOCKETS_DISCONNECTING");
          store.dispatch(socketActions.socketsDisconnecting());
          socket.close();
        }
        console.log("SOCKETS_CONNECTING");
        const HOST = location.origin.replace(/^http/, "ws");
        socket = new WebSocket(HOST);
        store.dispatch(socketActions.socketsConnecting());
        socket.onmessage = onMessage(socket, store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen();
        break;
      case "SOCKETS_DISCONNECT":
        if (socket !== null) {
          console.log("SOCKETS_DISCONNECTING");
          store.dispatch(socketActions.socketsDisconnecting());
          socket.close();
        }
        socket = null;
        break;
      case "JOIN_ROOM":
        if (socket && socket.readyState === 1 && action._id) {
          const data = JSON.stringify({
            join: true,
            host: action.owner_code,
            room: action._id,
            name: action.name
          });
          socket.send(data);
        }
        break;
      default:
        return next(action);
    }
  };
}
