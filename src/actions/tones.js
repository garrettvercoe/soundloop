//TONES
export const ADD_TONE = "ADD_TONE";
export const RESIZE_TONE = "RESIZE_TONE";
export const DELETE_TONE = "DELETE_TONE";
export const RECEIVE_TONES = "RECEIVE_TONES";

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

export function receiveTones(tones) {
  return {
    type: RECEIVE_TONES,
    tones
  };
}
