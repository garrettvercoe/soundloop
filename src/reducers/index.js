import loops from "./loops";
import tones from "./tones";
import shared from "./shared";
import cord from "./cord";
import { combineReducers } from "redux";

export default combineReducers({
  loops,
  tones,
  cord,
  shared
});
