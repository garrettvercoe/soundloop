import { ADD_LOOP, UPDATE_LOOP } from "../actions/loops";

export default function loops(state = [], action) {
  switch (action.type) {
    case ADD_LOOP:
      return [
        ...state,
        {
          radius: action.radius

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

    case UPDATE_LOOP:
      return {
        ...state
        // something here
      };
    default:
      return state;
  }
}
