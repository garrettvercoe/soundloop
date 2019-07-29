//TONES
export const ADD_TONE = "ADD_TONE";
export const UPDATE_TONE = "UPDATE_TONE";
export const RESIZE_TONE = "RESIZE_TONE";
export const DELETE_TONE = "DELETE_TONE";
export const RECEIVE_TONES = "RECEIVE_TONES";

export function addTone(
  colorCode,
  stroke,
  strokeWidth,
  offsetx,
  offsety,
  attLoop,
  rad,
  sound,
  rotation
) {
  return {
    type: ADD_TONE,

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
    rotation: rotation
  };
}
export function deleteTone(index) {
  return {
    type: DELETE_TONE,
    id: index
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

export function receiveTones(tones) {
  return {
    type: RECEIVE_TONES,
    tones
  };
}
