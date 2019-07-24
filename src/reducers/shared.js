import { TOGGLE_PLAY, TOGGLE_STOP, TOGGLE_RESTART, ADD_LOOP_COUNT } from "../actions/shared";

export default function shared(
  state = {
    playing: false,
    center: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    loopCount: 1
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
      }
    default:
      return state;
  }
}
