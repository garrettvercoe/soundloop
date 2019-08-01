import { PLAY_TONE } from "../actions/cord";
import { TRASH_ALL_LINEAR, TRASH_ALL_ANGULAR } from "../actions/shared";

let index = 0;
export default function cord(state = { sounds: [] }, action) {
  switch (action.type) {
    case PLAY_TONE:
      return Object.assign({}, state, {
        index: index++,
        //color: action.color,
        sounds: sounds(state.sounds, action)
      });
    case TRASH_ALL_LINEAR:
      index = 0;
      return Object.assign({}, state, {
        index: index,
        sounds: []
      });
    case TRASH_ALL_ANGULAR:
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
      return [...state, { sound: action.sound, duration: action.duration }];
    default:
      return state;
  }
}
