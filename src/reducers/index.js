import loops from "./loops";
import tones from "./tones";
import shared from "./shared";
import cord from "./cord";
import file from "./file";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  loops,
  tones,
  cord,
  shared,
  file
});

export default function(state, action) {
  if (action.type === "IMPORT_FILE") {
    action.data.shared = {
      playing: false,
      center: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      loopCount: 1,
      muted: false
    };
    action.data.cord = {};
    state = action.data;
    console.log("imported state: " + JSON.stringify(state));
  }
  return appReducer(state, action);
}
