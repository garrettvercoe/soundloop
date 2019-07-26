import { IMPORT_FILE } from "../actions/file";

export default function file(state = {}, action) {
  switch (action.type) {
    case IMPORT_FILE:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}
