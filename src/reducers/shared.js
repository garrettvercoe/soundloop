import {
  TOGGLE_PLAY,
  TOGGLE_STOP,
  TOGGLE_RESTART,
  TOGGLE_MUTE,
  TOGGLE_UNMUTE,
  TRASH_ALL_LINEAR,
  TRASH_ALL_ANGULAR,
  ADD_LOOP_COUNT,
  RESET_LOOP_COUNT,
  SCREEN_RESIZE,
  UPDATE_FILENAME,
  UPDATE_VOLUME,
  TOGGLE_MODE,
  UPDATE_TEMPO,
  UPDATE_SUSTAIN
} from "../actions/shared";

export default function shared(
  state = {
    playing: false,
    center: {
      x: 380 + (window.innerWidth - 380) / 2,
      y: window.innerHeight / 2
    },
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    loopCount: 1,
    muted: false,
    mode: "angular",

    selectedSustain: "8n",
    fileName: "MyProject",
    volume: 0,
    tempo: 1,
    toneSizes: {
      "32n": 10,
      "16n": 14,
      "8n": 16,
      "4n": 18,
      "2n": 20,
      "1m": 25,
      "2m": 30
    }
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
    case UPDATE_VOLUME:
      return Object.assign({}, state, {
        volume: action.volume
      });

    case UPDATE_TEMPO:
      return Object.assign({}, state, {
        tempo: action.tempo
      })

    case SCREEN_RESIZE:
      return Object.assign({}, state, {
        screenWidth: action.screenWidth,
        screenHeight: action.screenHeight,
        center: {
          x: 380 + (action.screenWidth - 380) / 2,
          y: action.screenHeight / 2
        }
      });

    case ADD_LOOP_COUNT:
      return {
        ...state,
        loopCount: action.loopCount
      };

    case RESET_LOOP_COUNT:
      return {
        ...state,
        loopCount: action.loopCount
      };

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
