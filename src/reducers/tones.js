import { ADD_TONE, RECEIVE_TONES, RESIZE_TONE, UPDATE_TONE, ROTATE_TONE, DELETE_TONE } from "../actions/tones";
import { strictEqual } from "assert";
import { stat } from "fs";

export default function tones(state = [], action) {
  switch (action.type) {
    case ADD_TONE:
      return [
        ...state,
        {
          id: action.id,
          color: action.color,
          stroke: action.stroke,
          strokeWidth: action.strokeWidth,
          attachedLoop: action.attachedLoop,
          radius: action.radius,
          sound: action.sound,
          position: action.position,
          offset: action.offset,
          rotation: action.rotation
        }
      ];

      // return new state with modified tone color, sound, and stroke with everything else same
    case UPDATE_TONE:
      //console.log(...state);
      var id = action.id;
      
      return [
        ...state.slice(0, id), 
        {
          ...state[id], 
          color: action.color,
          sound: action.sound,
          strokeWidth: action.strokeWidth
        }, 
        ...state.slice(id+1)
      ];

    case ROTATE_TONE:
        var id = action.id;
      
        return [
          ...state.slice(0, id), 
          {
            ...state[id], 
            offset: action.rotation
          }, 
          ...state.slice(id+1)
        ];
    
    case DELETE_TONE:
      console.log("action id" + action);
      console.log(
        "LOGGING FILTER" +
          [...state].filter(i => console.log(i.id !== action.id))
      );
      let x = [...state.filter((i, index) => index !== action.id)];
      return x;

    case RESIZE_TONE:
      return { state };

    case RECEIVE_TONES:
      return {
        ...state,
        ...action.tones
      };
    default:
      return state;
  }
}
