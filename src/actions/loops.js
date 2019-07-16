//LOOPS
export const ADD_LOOP = "ADD_LOOP";
export const UPDATE_LOOP = "UPDATE_LOOP";
export const RECEIVE_LOOPS = "RECEIVE_LOOPS";

let nextLoopId = 0;
export function addLoop(rad) {
  return {
    type: ADD_LOOP,
    id: nextLoopId++,
    radius: rad,
    speed: 20000/rad
  };
}

export function updateLoop(loop) {
  return {
    type: UPDATE_LOOP,
    loop
  };
}
