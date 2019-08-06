import {
  MAKE_INVISIBLE,
  CURSOR_ADD,
  CURSOR_MOVE,
  CURSOR_ERASE
} from "../actions/cursor";

export default function shared(
  state = {
    sound: "C",
    color: "transparent",
    mode: "empty"
  },
  action
) {
  switch (action.type) {
    case CURSOR_ADD:
      return Object.assign({}, state, {
        mode: "ADD",
        sound: action.sound
      });
    case CURSOR_MOVE:
      return Object.assign({}, state, {
        mode: "MOVE_UNSELECTED"
      });
    case CURSOR_ERASE:
      return Object.assign({}, state, {
        mode: "ERASE"
      });
    case MAKE_INVISIBLE:
      return Object.assign({}, state, {
        active: false,
        color: "transparent"
      });

    default:
      return state;
  }
}
