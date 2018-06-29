import { BAR_PIECE_SELECTION_TOGGLE } from "../common/actionTypes"

const defaultState = {
  selected: {
    key0: null,
    key1: null,
    val: null
  }
}

function handleUpdateSelected(state, payload) {
  const { key0, key1, val } = payload

  if (state.selected.key0 === key0 && state.selected.key1 === key1) {
    return {
      ...state,
      selected: {
        ...defaultState.selected
      }
    }
  } else {
    return {
      ...state,
      selected: {
        key0,
        key1,
        val
      }
    }
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case BAR_PIECE_SELECTION_TOGGLE:
      return handleUpdateSelected(state, action.payload)

    default:
      return state
  }
}
