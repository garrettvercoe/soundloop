import { ADD_LOOP, UPDATE_LOOP, ACTIVATE_LOOP, UPDATE_LOOP_SPEED } from "../actions/loops";

import { TRASH_ALL_LINEAR, TRASH_ALL_ANGULAR } from "../actions/shared";
let nextLoopId = 0;
export default function loops(state = [], action) {
  switch (action.type) {
    case ADD_LOOP:
      return [
        ...state,
        {
          id: nextLoopId++,
          radius: action.radius,
          speed:  82.5,
          rotation: action.rotation,
          active: action.active
        }
      ];

    case TRASH_ALL_LINEAR:
      nextLoopId = 0;
      return [];

    case TRASH_ALL_ANGULAR:
      nextLoopId = 0;
      return [];
    
    case UPDATE_LOOP:
      return [
        ...state.slice(0, action.id),
        {
          ...state[action.id],
          rotation: action.rotation
        },
        ...state.slice(action.id + 1)
      ];

      case UPDATE_LOOP_SPEED:
          return [
            ...state.slice(0, action.id),
            {
              ...state[action.id],
              speed: action.speed
            },
            ...state.slice(action.id + 1)
          ];

    case ACTIVATE_LOOP:
      return [
        ...state.slice(0, action.id),
        {
          ...state[action.id],
          active: action.active,
          stroke: action.stroke
        },
        ...state.slice(action.id + 1)
      ];

    default:
      return state;
  }
}
