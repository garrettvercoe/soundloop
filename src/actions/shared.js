import { addLoop, activateLoop } from "./loops";

//OVERALL
export const TOGGLE_PLAY = "TOGGLE_PLAY";
export const TOGGLE_STOP = "TOGGLE_STOP";
export const TOGGLE_RESTART = "TOGGLE_RESTART";
export const ADD_LOOP_COUNT = "ADD_LOOP_COUNT";
export const TOGGLE_MUTE = "TOGGLE_MUTE";
export const TOGGLE_UNMUTE = "TOGGLE_UNMUTE";
export const TRASH_ALL_LINEAR = "TRASH_ALL_LINEAR";
export const TRASH_ALL_ANGULAR = "TRASH_ALL_ANGULAR";
export const IMPORT_FILE = "IMPORT_FILE";
export const RESET_LOOP_COUNT = "RESET_LOOP_COUNT";
export const SCREEN_RESIZE = "SCREEN_RESIZE";
export const UPDATE_FILENAME = "UPDATE_FILENAME";
export const UPDATE_VOLUME = "UPDATE_VOLUME";

export function togglePlay() {
  return {
    type: TOGGLE_PLAY,
    playing: true
  };
}

export function updateFilename(name) {
  return {
    type: UPDATE_FILENAME,
    fileName: name
  };
}

export function updateVolume(vol) {
  return {
    type: UPDATE_VOLUME,
    volume: -((100 - vol) / 8)
  };
}

export function screenResize(width, height) {
  return {
    type: SCREEN_RESIZE,
    screenWidth: width,
    screenHeight: height
  };
}

export function toggleStop() {
  return {
    type: TOGGLE_STOP,
    playing: false
  };
}

let loopCount = 1;
export function addLoopCount() {
  return {
    type: ADD_LOOP_COUNT,
    loopCount: loopCount++
  };
}

export function resetLoopCount() {
  loopCount = 1;
  return {
    type: RESET_LOOP_COUNT,
    loopCount: loopCount
  };
}

export function toggleMute() {
  return {
    type: TOGGLE_MUTE,
    muted: true
  };
}

export function toggleUnmute() {
  return {
    type: TOGGLE_UNMUTE,
    muted: false
  };
}

export function trashAllLinear() {

  return dispatch => {
    dispatch({ type: TRASH_ALL_LINEAR });
    dispatch(addLoop(window.innerHeight / 3));
    dispatch(addLoop(window.innerHeight / 6));
    dispatch(addLoop(window.innerHeight / 12));
    dispatch(addLoop(window.innerHeight / 24));
    dispatch(addLoop(window.innerHeight / 48));
    dispatch(activateLoop(0));
    dispatch(resetLoopCount());
  };
}

export function trashAllAngular() {
  // var interval = this.props.centerY/7;
  var interval = window.innerHeight/14;
  return dispatch => {
    dispatch({ type: TRASH_ALL_ANGULAR });
    for (var i = 0; i < 5; i++){
      dispatch(addLoop((window.innerHeight / 3) - (interval*i)))
    }
    dispatch(activateLoop(0));
    dispatch(resetLoopCount());
  };
}

export function importFile(file) {
  return {
    type: IMPORT_FILE,
    data: file
  };
}
