import { ADD_TONE, RECEIVE_TONES, RESIZE_TONE, UPDATE_TONE, DELETE_TONE } from "../actions/tones";
import { strictEqual } from "assert";
import { stat } from "fs";
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

    case RESIZE_TONE:
      return { state };

    case DELETE_TONE:
        // let x = [...state.filter((i, index) => index !== action.id)];
        // return x;
      var id = action.id;
        return [
          ...state.slice(0, id), 
          // {
          //   ...state[id], 
          //   color: "#fff",
          //   sound: null
          // }, 
          ...state.slice(id+1)
        ];

    case TRASH_ALL:
      nextToneId = 0;
      var resetTones = [];
      
      // var cx = window.innerWidth/2;
      // var cy = window.innerHeight/2;
      // var numTones = Math.pow(2, 4-this.props.id);
      // var interval = (2*Math.PI)/numTones;
      // var currAngle = 0;
      // for (var i = 0; i < numTones; i++ ){
      //   var coords = this.findAngleCoord(cx, cy, currAngle, this.props.radius);
      //   console.log(coords)
      //   this.props.dispatch(addTone(cx, cy, "#fff", "#fff", 1.5, coords.x-cx, (coords.y-cy), this.props.id, 20, null));
      //   currAngle = currAngle+interval;
      // }
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
