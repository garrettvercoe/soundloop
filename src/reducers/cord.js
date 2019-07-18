import { PLAY_TONE } from "../actions/cord";

export default function cord(state = {}, action) {
  switch (action.type) {
    case PLAY_TONE:
      return Object.assign({}, state, {
        index: action.index,
        color: action.color,
        sounds: sounds(state.sounds, action)
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
