import { ADD_LOOP, UPDATE_LOOP } from "../actions/loops";

import { TRASH_ALL } from "../actions/shared";
let nextLoopId = 0;
export default function loops(state = [], action) {
  switch (action.type) {
    case ADD_LOOP:
      return [
        ...state,
        {
          id: nextLoopId++,
          radius: action.radius,
          speed: 20000 / action.radius
        }
      ];

    case TRASH_ALL:
      nextLoopId = 0;
      return [
        {
          id: nextLoopId++,
          radius: window.innerHeight / 3,
          speed: 20000 / (window.innerHeight / 3)
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
