import loops from "./loops";
import tones from "./tones";
import shared from "./shared";
import cord from "./cord";
import file from "./file";
import cursor from "./cursor";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  loops,
  tones,
  cord,
  shared,
  file,
  cursor
});

export default function(state, action) {
  if (action.type === "IMPORT_FILE") {
    state.tones = action.data.tones;
    state.loops = action.data.loops;
    state.shared = {
      playing: false,
      center: {
        x: 380 + (window.innerWidth - 380) / 2,
        y: window.innerHeight / 2
      },
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      muted: false,
      mode: "linear",
      octave: action.data.shared.octave,
      selectedSustain: action.data.shared.selectedSustain,
      fileName: action.data.shared.fileName,
      volume: 0,
      tempo: action.data.shared.tempo,
      toneSizes: {
        "32n": Math.round(window.innerHeight / 92),
        "16n": Math.round(window.innerHeight / 70),
        "8n": Math.round(window.innerHeight / 60),
        "4n": Math.round(window.innerHeight / 52),
        "2n": Math.round(window.innerHeight / 43),
        "1m": Math.round(window.innerHeight / 35)
      },
      sounds: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    };
    state.cursor = {
      sound: "C",
      color: "transparent",
      mode: "empty"
    };

    state.cord = { sounds: [] };
  }
  return appReducer(state, action);
}
