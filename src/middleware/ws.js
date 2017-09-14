import * as socketActions from "../actions/ws.js";
import { junkUpdate } from "../actions/index.js";
import { junkSend } from "../actions/ws.js";

const getCurRoomData = (allData, sendType) => ({
  data: {
    npcs: allData.npcs.filter(npc => npc.parentId === allData.rooms.currentId),
    players: allData.players.filter(
      player => player.parentId === allData.rooms.currentId
    ),
    rolls: {d20: allData.rolls.d20}
  },
  type: "update",
  room: allData.rooms.currentId
});

const sendUpsertToServer = (socket, store) => {
  if (socket && socket.readyState === 1) {
    const allData = store.getState();
    const dataForSend = getCurRoomData(allData);
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
          store.dispatch(data.action);
          store.dispatch(junkSend());
        } else {
          store.dispatch(junkUpdate(data));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return store => next => action => {
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
      case "SOCKETS_JUNK_SEND":
        console.log("try send");
        const timeDiff = Date.now() - prevSendTime;
        const delay = timeDiff > MIN_DELAY ? 0 : MIN_DELAY - timeDiff;

        setTimeout(() => {
          prevSendTime = sendUpsertToServer(socket, store);
        }, delay);
        break;
      case "SOCKETS_ACTION_SEND":
        console.log("try send player");
        const timeDiffAction = Date.now() - prevSendTime;
        const delayAction =
          timeDiffAction > MIN_DELAY ? 0 : MIN_DELAY - timeDiffAction;

        setTimeout(() => {
          let curRoomID = store.getState().rooms.currentId;
          prevSendTime = sendActionToServer(socket, action, curRoomID);
        }, delayAction);
        break;
      case "JOIN_ROOM":
        console.log("action");
        console.log(action);
        console.log(socket);
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
