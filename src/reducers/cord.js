import { PLAY_TONE } from "../actions/cord";
import { TRASH_ALL } from "../actions/shared";

let index = 0;
export default function cord(state = {}, action) {
  switch (action.type) {
    case PLAY_TONE:
      return Object.assign({}, state, {
        index: index++,
        color: action.color,
        sounds: sounds(state.sounds, action)
      });
    case TRASH_ALL:
      index = 0;
      return Object.assign({}, state, {
        index: index,
        sounds: []
      });
    default:
      return state;
  }
}

function sounds(state = [], action) {
  switch (action.type) {
    case PLAY_TONE:
      return [...state, action.sound];
    default:
      return state;
  }
}
