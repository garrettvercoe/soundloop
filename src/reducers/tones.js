import {
  ADD_TONE,
  RECEIVE_TONES,
  RESIZE_TONE,
  UPDATE_TONE,
  DELETE_TONE,
  REPLACE_TONE
} from "../actions/tones";
import { strictEqual } from "assert";
import { stat } from "fs";
import { TRASH_ALL_LINEAR, TRASH_ALL_ANGULAR } from "../actions/shared";

let nextToneId = 0;
export default function tones(state = [], action) {
  switch (action.type) {
    case ADD_TONE:
      return [
        ...state,
        {
          id: nextToneId++,
          color: action.color,
          attachedLoop: action.attachedLoop,
          radius: action.radius,
          sound: action.sound,
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
          radius: action.radius,
          duration: action.duration
        },
        ...state.slice(id + 1)
      ];

    case RESIZE_TONE:
      return { state };

    case DELETE_TONE:
      // let x = [...state.filter((i, index) => index !== action.id)];
      // return x;
      var id = action.id;
      return [
        ...state.slice(0, id),
        {
          id: id,
          color: action.color,
          stroke: action.stroke,
          strokeWidth: action.strokeWidth,
          attachedLoop: action.attachedLoop,
          radius: action.radius,
          sound: action.sound,
          position: action.position,
          offset: action.offset,
          rotation: action.rotation
        },
        ...state.slice(id + 1)
      ];

    case REPLACE_TONE:
      var id = action.id;
      return [
        ...state.slice(0, id),
        {
          id: id,
          color: action.color,
          stroke: action.stroke,
          strokeWidth: action.strokeWidth,
          attachedLoop: action.attachedLoop,
          radius: action.radius,
          sound: action.sound,
          position: action.position,
          offset: action.offset,
          rotation: action.rotation,
          duration: action.duration
        },
        ...state.slice(id + 1)
      ];

    case TRASH_ALL_LINEAR:
      nextToneId = 0;

      return [];

    case TRASH_ALL_ANGULAR:
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
