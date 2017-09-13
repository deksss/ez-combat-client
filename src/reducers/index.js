import { routerReducer as routing } from "react-router-redux";
import { combineReducers } from "redux";
import templates from "./templates";
import players from "./players";
import npcs from "./npcs";
import unitTemplates from "./unitTemplates";
import fieldTemplates from "./fieldTemplates";
import rooms from "./rooms";
import ws from "./ws";
import user from "./user";
import sidebar from "./sidebar";
import FileSaver from "file-saver";

function reduceReducers(...reducers) {
  return (previous, current) =>
    reducers.reduce((p, r) => r(p, current), previous);
}

function dumbUpdate(state, action) {
  const remoteNpcs = action.data.npcs;
  const remotePlayers = action.data.players;
  const npcsNew =
    remoteNpcs &&
    remoteNpcs.filter(rnpc => !state.npcs.find(npc => npc._id === rnpc._id));
  const playersNew =
    remotePlayers &&
    remotePlayers.filter(
      rplayer => !state.players.find(player => player._id === rplayer._id)
    );

  return Object.assign({}, state, {
    npcs: [
      ...[...state.npcs]
        .map(npc => {
          if (npc.parantId === action.room) {
            return (
              (remoteNpcs && remoteNpcs.find(rnpc => rnpc._id === npc._id)) ||
              false
            );
          }
          return npc;
        })
        .filter(npc => npc !== false),
      ...npcsNew
    ],
    players: [
      ...[...state.players]
        .map(player => {
          if (player.parantId === action.room) {
            return (
              (remotePlayers &&
                remotePlayers.find(rplayer => rplayer._id === player._id)) ||
              false
            );
          }
          return player;
        })
        .filter(player => player !== false),
      ...playersNew
    ]
  });
}

const rootReducer = reduceReducers(
  combineReducers({
    routing,
    rooms,
    templates,
    players,
    npcs,
    unitTemplates,
    fieldTemplates,
    ws,
    user,
    sidebar
  }),
  (state, action) => {
    switch (action.type) {
      case "JUNK_UPDATE":
        return dumbUpdate(state, action);
      case "SAVE_STORE_TO_FILE":
        //todo: move logic to saga
        const filename = "ez-combat-store";
        const blob = new Blob([JSON.stringify(state)], {
          type: "application/json"
        });
        FileSaver.saveAs(blob, filename + ".json");
        return state;
      case "LOAD_STORE_FROM_JSON":
        return Object.assign({}, state, action.data);
      default:
        return state;
    }
  }
);

export default rootReducer;
