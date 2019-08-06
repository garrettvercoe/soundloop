export const MAKE_VISIBLE = "MAKE_VISIBLE";
export const MAKE_INVISIBLE = "MAKE_INVISIBLE";

export function makeVisible(s) {
  return {
    type: MAKE_VISIBLE,
    sound: s
  };
}

export function makeInvisible() {
  return {
    type: MAKE_INVISIBLE
  };
}
