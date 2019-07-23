import loops from "./loops";
import tones from "./tones";
import shared from "./shared";
import cord from "./cord";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  loops,
  tones,
  cord,
  shared
});

export default function(state, action) {
  return appReducer(state, action);
}
