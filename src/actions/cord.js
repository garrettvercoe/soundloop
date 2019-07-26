export const PLAY_TONE = "PLAY_TONE";

export function playTone(sound, color) {
  return {
    type: PLAY_TONE,
    sound: sound,
    color: color
  };
}
