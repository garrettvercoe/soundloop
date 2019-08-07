export const CURSOR_ADD = "CURSOR_ADD";
export const CURSOR_MOVE_SELECTED = "CURSOR_MOVE_SELECTED";
export const CURSOR_MOVE_UNSELECTED = "CURSOR_MOVE_UNSELECTED";
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

export function cursorMoveUnselected() {
  return {
    type: CURSOR_MOVE_UNSELECTED
  };
}
export function cursorMoveSelected(s) {
  return {
    type: CURSOR_MOVE_SELECTED,
    sound: s
  };
}

export function makeInvisible() {
  return {
    type: MAKE_INVISIBLE
  };
}
