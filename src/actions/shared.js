//OVERALL
export const TOGGLE_PLAY = "TOGGLE_PLAY";
export const TOGGLE_STOP = "TOGGLE_STOP";
export const TOGGLE_RESTART = "TOGGLE_RESTART";
export const TOGGLE_MUTE = "TOGGLE_MUTE";
export const TOGGLE_UNMUTE = "TOGGLE_UNMUTE";
export const TRASH_ALL = "TRASH_ALL";
export const IMPORT_FILE = "IMPORT_FILE";

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

export function trashAll() {
  return {
    type: TRASH_ALL
  };
}

export function importFile(file) {
  return {
    type: IMPORT_FILE,
    data: file
  };
}
