//TONES
export const ADD_TONE = "ADD_TONE";
export const RESIZE_TONE = "RESIZE_TONE";
export const RECEIVE_TONES = "RECEIVE_TONES";

let nextToneId = 0;
export function addTone(colorCode, attLoop, rad, time) {
  return {
    type: ADD_TONE,
    id: nextToneId++,
    color: colorCode,
    attachedLoop: attLoop,
    radius: rad,
    timeToAct: time
  };
}

export function resizeTone(tone) {
  return {
    type: RESIZE_TONE,
    tone
  };
}

export function receiveTones(tones) {
  return {
    type: RECEIVE_TONES,
    tones
  };
}
