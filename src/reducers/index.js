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
      center: {
        x: 380 + (window.innerWidth - 380) / 2,
        y: window.innerHeight / 2
      },
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      loopCount: 1,
      muted: false
    };
    action.data.cord = {};
    state = action.data;
  }
  return appReducer(state, action);
}
