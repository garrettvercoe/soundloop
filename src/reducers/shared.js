import { TOGGLE_PLAY, TOGGLE_STOP, TOGGLE_RESTART } from "../actions/shared";

export default function shared(
  state = {
    playing: false
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
