import { addLoopCount } from "./shared";

//LOOPS
export const ADD_LOOP = "ADD_LOOP";
export const UPDATE_LOOP = "UPDATE_LOOP";
export const RECEIVE_LOOPS = "RECEIVE_LOOPS";
export const ACTIVATE_LOOP = "ACTIVATE_LOOP";
export const UPDATE_LOOP_SPEED = "UPDATE_LOOP_SPEED";

let nextLoopId = 0;
export function addLoop(rad) {
  var cx = window.innerWidth / 2;
  var cy = window.innerHeight / 2;
  return {
    type: ADD_LOOP,
    id: nextLoopId++,
    radius: rad,
    rotation: 0,
    active: false
  };
}

export function updateLoop(id, rotation) {
  return {
    type: UPDATE_LOOP,
    id: id,
    rotation: rotation
  };
}

export function updateLoopSpeed(id, speed) {
  return {
    type: UPDATE_LOOP_SPEED,
    id: id,
    speed: speed
  };
}

export function activateLoop(id) {
  return dispatch => {
    dispatch({
      type: ACTIVATE_LOOP,
      id: id,
      active: true,
      stroke: "#ed1e79"
    });
    dispatch(addLoopCount());
  };
}
