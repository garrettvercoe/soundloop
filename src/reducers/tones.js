import {
  ADD_TONE,
  RECEIVE_TONES,
  RESIZE_TONE,
  DELETE_TONE
} from "../actions/tones";
import { TRASH_ALL } from "../actions/shared";

let nextToneId = 0;
export default function tones(state = [], action) {
  switch (action.type) {
    case ADD_TONE:
      return [
        ...state,
        {
          id: nextToneId++,
          color: action.color,
          // sound: "idk",
          attachedLoop: action.attachedLoop,
          radius: action.radius,
          sound: action.sound,
          position: action.position,
          offset: action.offset
        }
      ];

    case RESIZE_TONE:
      return { state };

    case DELETE_TONE:
      console.log("action id" + action);
      console.log(
        "LOGGING FILTER" +
          [...state].filter(i => console.log(i.id !== action.id))
      );
      let x = [...state.filter((i, index) => index !== action.id)];
      return x;
    case TRASH_ALL:
      nextToneId = 0;
      return [];

    case RECEIVE_TONES:
      return {
        ...state,
        ...action.tones
      };
    default:
      return state;
  }
}
