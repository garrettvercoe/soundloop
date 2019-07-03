import { ADD_LOOP, UPDATE_LOOP, RECEIVE_LOOPS, receiveLoops } from "../actions/loops";

export default function loops(state = {}, action) {
  switch (action.type) {
    case ADD_LOOP:
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
      
    case UPDATE_LOOP:
      return {
        ...state
        // something here
      };
    default:
      return state;
  }
}