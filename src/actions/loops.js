//LOOPS
export const ADD_LOOP = "ADD_LOOP";
export const RESIZE_LOOP = "RESIZE_LOOP";
export const RECEIVE_LOOPS = "RECEIVE_LOOPS";

export function addLoop(loop) {
  return {
    type: ADD_LOOP,
    loop
  };
}

export function resizeLoop(loop) {
  return {
    type: RESIZE_LOOP,
    loop
  };
}

export function receiveLoops(loops) {
  return {
    type: RECEIVE_LOOPS,
    loops
  };
}
