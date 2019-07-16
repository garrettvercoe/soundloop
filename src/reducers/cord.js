import { PLAY_TONE } from "../actions/cord";

export default function cord(state = {}, action) {
  return Object.assign({}, state, {
    index: action.index,
    sounds: sounds(state.sounds, action)
  });
}

function sounds(state = [], action) {
  switch (action.type) {
    case PLAY_TONE:
      return [...state, action.sound];
    default:
      return state;
  }
}
