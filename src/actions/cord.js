export const PLAY_TONE = "PLAY_TONE";

export function playTone(sound, sustain) {
  return {
    type: PLAY_TONE,
    sound: sound,
    duration: sustain
  };
}
