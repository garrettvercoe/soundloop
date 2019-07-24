import {addLoopCount} from "./shared"

//LOOPS
export const ADD_LOOP = "ADD_LOOP";
export const UPDATE_LOOP = "UPDATE_LOOP";
export const RECEIVE_LOOPS = "RECEIVE_LOOPS";
export const ACTIVATE_LOOP = "ACTIVATE_LOOP";



let nextLoopId = 0;
export function addLoop(rad) {
  var cx = window.innerWidth/2;
  var cy = window.innerHeight/2;
  return {
    type: ADD_LOOP,
    id: nextLoopId++,
    radius: rad,
    speed: 20000/rad,
    rotation: 0,
    active: false,
  };
}

export function updateLoop(id, rotation) {
  return {
    type: UPDATE_LOOP,
    id: id,
    rotation: rotation
  };
}

export function activateLoop(id) {
  return(dispatch)=> {
    dispatch({
    type: ACTIVATE_LOOP,
    id: id,
    active: true,
    stroke: "#ed1e79"
    })
    dispatch(addLoopCount())
  };
}
