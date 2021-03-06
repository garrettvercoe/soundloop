import {
  TOGGLE_PLAY,
  TOGGLE_STOP,
  TOGGLE_RESTART,
  TOGGLE_MUTE,
  TOGGLE_UNMUTE,
  TRASH_ALL_LINEAR,
  TRASH_ALL_ANGULAR,
  SCREEN_RESIZE,
  UPDATE_FILENAME,
  UPDATE_VOLUME,
  TOGGLE_MODE,
  UPDATE_TEMPO,
  UPDATE_SUSTAIN,
  UPDATE_OCTAVE
} from "../actions/shared";

export default function shared(
  state = {
    playing: false,
    center: {
      x: 380 + (window.innerWidth - 380) / 2,
      y: window.innerHeight / 2 - 15
    },
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    loopCount: 1,
    muted: false,
    mode: "linear",
    octave: 4,
    selectedSustain: "8n",
    fileName: "MyProject",
    volume: 0,
    tempo: 110,
    toneSizes: {
      "32n": window.innerHeight/80,
      "16n": window.innerHeight/57,
      "8n": window.innerHeight/50,
      "4n": window.innerHeight/45,
      "2n": window.innerHeight/40,
      "1m": window.innerHeight/33,
      "2m": 30
    },
    sounds: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
  },
  action
) {
  switch (action.type) {
    case TOGGLE_PLAY:
      return Object.assign({}, state, {
        playing: true
      });
    case TOGGLE_STOP:
      return Object.assign({}, state, {
        playing: false
      });
    case TOGGLE_MODE:
      return Object.assign({}, state, {
        mode: action.mode
      });

    case UPDATE_FILENAME:
      return Object.assign({}, state, {
        fileName: action.fileName
      });
    case UPDATE_SUSTAIN:
      return Object.assign({}, state, {
        selectedSustain: action.selectedSustain
      });

    case UPDATE_OCTAVE:
      return Object.assign({}, state, {
        octave: action.octave
      });

    case UPDATE_VOLUME:
      return Object.assign({}, state, {
        volume: action.volume
      });

    case UPDATE_TEMPO:
      return Object.assign({}, state, {
        tempo: action.tempo
      });

    case SCREEN_RESIZE:
      return Object.assign({}, state, {
        screenWidth: action.screenWidth,
        screenHeight: action.screenHeight,
        center: {
          x: 380 + (action.screenWidth - 380) / 2,
          y: action.screenHeight / 2
        }
      });

    case TOGGLE_MUTE:
      return Object.assign({}, state, {
        muted: true
      });
    case TOGGLE_UNMUTE:
      return Object.assign({}, state, {
        muted: false
      });
    case TRASH_ALL_LINEAR:
      return state;
    case TRASH_ALL_ANGULAR:
      return state;
    default:
      return state;
  }
}
