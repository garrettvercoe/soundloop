//TONES
export const ADD_TONE = "ADD_TONE";
export const UPDATE_TONE = "UPDATE_TONE";
export const RESIZE_TONE = "RESIZE_TONE";
export const RECEIVE_TONES = "RECEIVE_TONES";
export const ROTATE_TONE = "ROTATE_TONE";

let nextToneId = 0;
export function addTone(
  xCoord,
  yCoord,
  colorCode,
  stroke,
  strokeWidth,
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
    stroke: stroke,
    strokeWidth: strokeWidth,
    attachedLoop: attLoop,
    radius: rad,
    sound: sound,
    rotation: 0,
  };
}

export function resizeTone(tone) {
  return {
    type: RESIZE_TONE,
    tone
  };
}

export function updateTone(id, color, sound, strokeWidth) {
  return {
    type: UPDATE_TONE,
    id: id,
    color: color,
    sound: sound,
    strokeWidth: strokeWidth
  };
}

export function rotateTone(id, rotation){
  return {
    type: ROTATE_TONE,
    id: id,
    rotation: rotation
  }
}

export function receiveTones(tones) {
  return {
    type: RECEIVE_TONES,
    tones
  };
}
