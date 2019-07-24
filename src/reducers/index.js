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
    state = action.data;
  }
  return appReducer(state, action);
}
