import {
  TOGGLE_PLAY,
  TOGGLE_STOP,
  TOGGLE_RESTART,
  TOGGLE_MUTE,
  TOGGLE_UNMUTE,
  TRASH_ALL,
  ADD_LOOP_COUNT,
  RESET_LOOP_COUNT
} from "../actions/shared";

export default function shared(
  state = {
    playing: false,
    center: {
      x: 380 + (window.innerWidth - 380) / 2,
      y: window.innerHeight / 2
    },
    loopCount: 1,
    muted: false,
    mode: false
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
    case TRASH_ALL:
      return state;

    default:
      return state;
  }
}
