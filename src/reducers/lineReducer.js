import {
  LINE_BRUSH_START,
  LINE_BRUSH_MOVE,
  LINE_BRUSH_END
} from "../common/actionTypes"

const defaultState = {
  brush: []
}

// note: could use a single action for updating the brush data here, but may
// want to do something different with each of these later
export default function (state = defaultState, action) {
  switch (action.type) {
    case LINE_BRUSH_START:
      return {
        ...state,
        brush: action.data
      }

    case LINE_BRUSH_MOVE:
      return {
        ...state,
        brush: action.data
      }

    case LINE_BRUSH_END:
      return {
        ...state,
        brush: action.data
      }

    default:
      return state
  }
}
