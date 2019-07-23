import {
  TOGGLE_PLAY,
  TOGGLE_STOP,
  TOGGLE_RESTART,
  TOGGLE_MUTE,
  TOGGLE_UNMUTE,
  TRASH_ALL
} from "../actions/shared";

export default function shared(
  state = {
    playing: false,
    muted: false,
    center: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
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
