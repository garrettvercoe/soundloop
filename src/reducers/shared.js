import { TOGGLE_PLAY, TOGGLE_STOP, TOGGLE_RESTART } from "../actions/shared";

export default function shared(
  state = {
    playing: false,
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
    default:
      return state;
  }
}
