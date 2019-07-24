//OVERALL
export const TOGGLE_PLAY = "TOGGLE_PLAY";
export const TOGGLE_STOP = "TOGGLE_STOP";
export const TOGGLE_RESTART = "TOGGLE_RESTART";
export const ADD_LOOP_COUNT = "ADD_LOOP_COUNT";

export function togglePlay() {
  return {
    type: TOGGLE_PLAY,
    playing: true
  };
}

export function toggleStop() {
  return {
    type: TOGGLE_STOP,
    playing: false
  };
}
let loopCount = 1;
export function addLoopCount(){
  return {
    type: ADD_LOOP_COUNT,
    loopCount: loopCount++
  }
}
