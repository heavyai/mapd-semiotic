import { REQUEST_DATA } from "../common/actionTypes"

const defaultState = {
  isFetching: false,
  rows: null,
  error: null
}

export default function(state = defaultState, action) {
  switch(action.type) {
    case `${REQUEST_DATA}_PENDING`:
      return {
        ...state,
        isFetching: true
      }

    case `${REQUEST_DATA}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        rows: action.payload
      }

    case `${REQUEST_DATA}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    default:
      return state
  }
}
