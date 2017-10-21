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
import rolls from "./rolls";
import { savePreset, loadPreset } from "../common/preset";
import dumbUpdate from "./helpers/dumbUpdate";
import mainTabs from "./mainTabs";

function reduceReducers(...reducers) {
  return (previous, current) =>
    reducers.reduce((p, r) => r(p, current), previous);
}

const rootReducer = reduceReducers(
  combineReducers({
    rooms,
    templates,
    players,
    npcs,
    unitTemplates,
    fieldTemplates,
    ws,
    user,
    sidebar,
    rolls,
    mainTabs
  }),
  (state, action) => {
    switch (action.type) {
      case "JUNK_UPDATE":
        return dumbUpdate(state, action);
      case "SAVE_STORE_TO_FILE":
        //todo: move logic to saga
        const roomId = action.roomId || state.rooms.currentId
        const filename = `ez-combat-preset-${roomId}`;
        const dataForSave = savePreset(state, roomId);
        const blob = new Blob([JSON.stringify(dataForSave)], {
          type: "application/json"
        });
        FileSaver.saveAs(blob, filename + ".json");
        return state;
      case "LOAD_STORE_FROM_JSON":
        return loadPreset(state, action.data);
      default:
        return state;
    }
  }
);

export default rootReducer;
