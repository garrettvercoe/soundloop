import { addLoop, activateLoop } from "./loops";
import ToggleMode from "../components/ToggleMode";

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
export const TOGGLE_MODE = "TOGGLE_MODE";
export const UPDATE_TEMPO = "UPDATE_TEMPO";
export const UPDATE_SUSTAIN = "UPDATE_SUSTAIN";

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

export function updateSustain(sus) {
  return {
    type: UPDATE_SUSTAIN,
    selectedSustain: sus
  };
}

export function updateVolume(vol) {
  return {
    type: UPDATE_VOLUME,
    volume: -((100 - vol) / 8)
  };
}

export function updateTempo(tempo) {
  return {
    type: UPDATE_TEMPO,
    tempo: tempo
  };
}

export function toggleMode(toggled) {
  return { type: TOGGLE_MODE, mode: toggled };
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
  console.log("TRASH ALL LIN");
  return dispatch => {
    dispatch({ type: TRASH_ALL_LINEAR });
    dispatch(resetLoopCount());
    dispatch(addLoop(window.innerHeight / 3));
    dispatch(addLoop(window.innerHeight / 6));
    dispatch(addLoop(window.innerHeight / 12));
    dispatch(addLoop(window.innerHeight / 24));
    dispatch(addLoop(window.innerHeight / 48));
    dispatch(activateLoop(0));
  };
}

export function trashAllAngular() {
  // var interval = this.props.centerY/7;
  console.log("TRASH ALL ANG");
  var interval = window.innerHeight / 14;
  return dispatch => {
    dispatch({ type: TRASH_ALL_ANGULAR });
    dispatch(resetLoopCount());
    for (var i = 0; i < 5; i++){
      dispatch(addLoop((window.innerHeight / 3) - (interval*i)))
    }
    dispatch(activateLoop(0));
  };
}

export function importFile(file) {
  return {
    type: IMPORT_FILE,
    data: file
  };
}
