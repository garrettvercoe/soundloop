//TONES
export const ADD_TONE = "ADD_TONE";
export const RESIZE_TONE = "RESIZE_TONE";
export const RECEIVE_TONES = "RECEIVE_TONES";

export function addTone(tone) {
  return {
    type: ADD_TONE,
    tone
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
    type: RESIZE_TONE,
    tones
  };
}
