//LOOPS
export const ADD_LOOP = "ADD_LOOP";
export const UPDATE_LOOP = "UPDATE_LOOP";
export const RECEIVE_LOOPS = "RECEIVE_LOOPS";

export function addLoop(loop) {
  return {
    type: ADD_LOOP,
    loop,
    id
  };
}

export function updateLoop(loop) {
  return {
    type: UPDATE_LOOP,
    loop,
    id,
    radius
  };
}

export function receiveLoops(loops) {
  return {
    type: RECEIVE_LOOPS,
    loops
  };
}
