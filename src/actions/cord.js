export const PLAY_TONE = "PLAY_TONE";

let index = 0;
export function playTone(sound, color) {
  return {
    type: PLAY_TONE,
    sound: sound,
    index: index++,
    color: color
  };
}
