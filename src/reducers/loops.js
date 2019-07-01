import { ADD_LOOP, UPDATE_LOOP, RECEIVE_LOOPS } from "../actions/loops";

export default function loops(state = {}, action) {
  switch (action.type) {
    case ADD_LOOP:
      return {
        ...state,
        [action.loop.id]: action.loop
      };
    case UPDATE_LOOP:
      return {
        ...state
        // something here
      };
    case RECEIVE_LOOPS:
      return {
        ...state,
        ...action.loops
      };
    default:
      return state;
  }
}
