import { ADD_TONE, RECEIVE_TONES, RESIZE_TONE } from "../actions/tones";

export default function tones(state = {}, action) {
  switch (action.type) {
    case ADD_TONE:
      const tone = action.tone;
      const {
        id,
        color,
        sound,
        attachedLoop,
        radius,
        timeToActivate,
        InitPosition,
        CurrPosition
      } = tone;
      return {
        ...state,
        [id]: {
          ...state[id],
          color: state[id].color,
          sound: state[id].sound,
          attachedLoop: state[id].attachedLoop,
          radius: state[id].radius,
          timeToActivate: state[id].timeToActivate,
          initPosition: state[id].initPosition,
          currPosition: state[id].currPosition
        }
      };

    case RESIZE_TONE:
      return { state };
    case RECEIVE_TONES:
      return {
        ...state,
        ...action.tones
      };
    default:
      return state;
  }
}
