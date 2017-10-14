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
    rolls
  }),
  (state, action) => {
    switch (action.type) {
      case "JUNK_UPDATE":
        return dumbUpdate(state, action);
      case "SAVE_STORE_TO_FILE":
        //todo: move logic to saga
        const filename = `ez-combat-preset-${state.rooms.currentId}`;
        const dataForSave = savePreset(state);
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
