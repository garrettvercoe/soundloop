//TONES
export const ADD_TONE = "ADD_TONE";
export const RESIZE_TONE = "RESIZE_TONE";
export const RECEIVE_TONES = "RECEIVE_TONES";

let nextToneId = 0;
export function addTone(
  xCoord,
  yCoord,
  colorCode,
  offsetx,
  offsety,
  attLoop,
  rad,
  sound
) {
  return {
    type: ADD_TONE,
    id: nextToneId++,
    position: {
      x: xCoord,
      y: yCoord
    },
    offset: {
      x: offsetx,
      y: offsety
    },
    color: colorCode,
    attachedLoop: attLoop,
    radius: rad,
    sound: sound
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
