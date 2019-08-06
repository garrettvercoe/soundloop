import { MAKE_INVISIBLE, MAKE_VISIBLE } from "../actions/cursor";

export default function shared(
  state = {
    active: false,
    sound: "C",
    color: "transparent"
  },
  action
) {
  switch (action.type) {
    case MAKE_VISIBLE:
      return Object.assign({}, state, {
        active: true,
        sound: action.sound
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
