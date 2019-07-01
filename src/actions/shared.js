//OVERALL
export const TOGGLE_PLAY = "TOGGLE_PLAY";
export const TOGGLE_STOP = "TOGGLE_STOP";
export const TOGGLE_RESTART = "TOGGLE_RESTART";

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
