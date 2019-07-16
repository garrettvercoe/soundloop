import { ADD_LOOP, UPDATE_LOOP } from "../actions/loops";

export default function loops(state = [], action) {
  switch (action.type) {
    case ADD_LOOP:
      return [
        ...state,
        {
          id: action.id,
          radius: action.radius,
          speed: action.speed
        }
      ];

    case UPDATE_LOOP:
      return {
        ...state
        // something here
      };
    default:
      return state;
  }
}
