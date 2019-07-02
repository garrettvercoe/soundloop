import { ADD_TONE, RECEIVE_TONES, RESIZE_TONE } from "../actions/tones";

export default function tones(state = [], action) {
  switch (action.type) {
    case ADD_TONE:
      return [
        ...state,
        {
          id: action.id,
          color: action.color,
          // sound: "idk",
          attachedLoop: action.attachedLoop,
          radius: action.radius,
          timeToAct: 300.0
          //   InitPosition: {
          //       x: 300,
          //       y: 478
          //   },
          //   CurrPosition: {
          //     x: 300,
          //     y: 478
          // }
        }
      ];

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
