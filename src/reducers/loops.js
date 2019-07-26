import { ADD_LOOP, UPDATE_LOOP, ACTIVATE_LOOP } from "../actions/loops";

import { TRASH_ALL } from "../actions/shared";
let nextLoopId = 0;
export default function loops(state = [
  //{
    //   id: 0,
    //   radius: window.innerHeight / 3,
    //   speed: 20000 / (window.innerHeight / 3),
    //   rotation: 0,
    //   stroke: "#ed1e79",
    //   active: true
    // },
    // {
    //   id: 1,
    //   radius: window.innerHeight / 6,
    //   speed: 20000 / (window.innerHeight / 6),
    //   rotation: 0,
    //   stroke: "transparent",
    //   active: false
    // },
    // {
    //   id: 2,
    //   radius: window.innerHeight / 12,
    //   speed: 20000 / (window.innerHeight / 12),
    //   rotation: 0,
    //   stroke: "transparent",
    //   active: false
    // },
    // {
    //   id: 3,
    //   radius: window.innerHeight / 24,
    //   speed: 20000 / (window.innerHeight / 24),
    //   rotation: 0,
    //   stroke: "transparent",
    //   active: false
    // },
    // {
    //   id: 4,
    //   radius: window.innerHeight / 48,
    //   speed: 20000 / (window.innerHeight / 48),
    //   rotation: 0,
    //   stroke: "transparent",
    //   active: false}
  ], action) {
  switch (action.type) {
    case ADD_LOOP:
      return [
        ...state,
        {
          id: nextLoopId++,
          radius: action.radius,
          speed: 20000/action.radius,
          rotation: action.rotation,
          active: action.active
        }
      ];

    // case TRASH_ALL:
    //   nextLoopId = 0;
    //   return [
    //     {
    //       id: nextLoopId++,
    //       radius: window.innerHeight / 3,
    //       speed: 20000 / window.innerHeight / 3,
    //       rotation: 0,
    //       stroke: "#ed1e79",
    //       active: true
    //     },
    //     {
    //       id: nextLoopId++,
    //       radius: window.innerHeight / 6,
    //       speed: 20000 / (window.innerHeight / 6),
    //       rotation: 0,
    //       stroke: "transparent",
    //       active: false
    //     },
    //     {
    //       id: nextLoopId++,
    //       radius: window.innerHeight / 12,
    //       speed: 20000 / (window.innerHeight / 12),
    //       rotation: 0,
    //       stroke: "transparent",
    //       active: false
    //     },
    //     {
    //       id: nextLoopId++,
    //       radius: window.innerHeight / 24,
    //       speed: 20000 / (window.innerHeight / 24),
    //       rotation: 0,
    //       stroke: "transparent",
    //       active: false
    //     },
    //     {
    //       id: nextLoopId++,
    //       radius: window.innerHeight / 48,
    //       speed: 20000 / (window.innerHeight / 48),
    //       rotation: 0,
    //       stroke: "transparent",
    //       active: false
    //     }
    //   ];
    case TRASH_ALL:
      nextLoopId = 0;
      return [];
      
    case UPDATE_LOOP:
        var id = action.id;
        return [
          ...state.slice(0, id), 
          {
            ...state[id], 
            rotation: action.rotation
          }, 
          ...state.slice(id+1)
        ];


    case ACTIVATE_LOOP:
        var id = action.id;
        return [
          ...state.slice(0, id), 
          {
            ...state[id], 
            active: action.active,
            stroke: action.stroke
          }, 
          ...state.slice(id+1)
        ];

    default:
      return state;
  }
}
