import { ADD_LOOP, UPDATE_LOOP, ACTIVATE_LOOP } from "../actions/loops";

export default function loops(state = [], action) {
  switch (action.type) {
    case ADD_LOOP:
      return [
        ...state,
        {
          id: action.id,
          radius: action.radius,
          speed: action.speed,
          rotation: action.rotation,
          active: action.active
        }
      ];

    case UPDATE_LOOP:
        var id = action.id;
        return [
          ...state.slice(0, id), 
          {
            ...state[id], 
            rotation: action.rotation
          }, 
          ...state.slice(id+1)
        ];


    case ACTIVATE_LOOP:
        var id = action.id;
        return [
          ...state.slice(0, id), 
          {
            ...state[id], 
            active: action.active,
            stroke: action.stroke
          }, 
          ...state.slice(id+1)
        ];

    default:
      return state;
  }
}
