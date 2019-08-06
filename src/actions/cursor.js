export const CURSOR_ADD = "CURSOR_ADD";
export const CURSOR_MOVE = "CURSOR_MOVE";
export const CURSOR_ERASE = "CURSOR_ERASE";
export const MAKE_INVISIBLE = "MAKE_INVISIBLE";

export function cursorAdd(s) {
  return {
    type: CURSOR_ADD,
    sound: s
  };
}

export function cursorErase() {
  return {
    type: CURSOR_ERASE
  };
}

export function cursorMove() {
  return {
    type: CURSOR_MOVE
  };
}

export function makeInvisible() {
  return {
    type: MAKE_INVISIBLE
  };
}
