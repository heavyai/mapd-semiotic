import { REQUEST_DATA } from "../common/actionTypes"

const stateTemplate = {
  isFetching: false,
  rows: null,
  error: null
}

const defaultState = {
  line: { ...stateTemplate },
  counter: { ...stateTemplate }
}

export default function(state = defaultState, action) {
  switch(action.type) {
    case `${REQUEST_DATA}_PENDING`:
      return {
        ...state,
        [action.meta.chartId]: {
          ...state[action.meta.chartId],
          isFetching: true
        }
      }

    case `${REQUEST_DATA}_FULFILLED`:
      return {
        ...state,
        [action.meta.chartId]: {
          ...state[action.meta.chartId],
          isFetching: false,
          rows: action.payload
        }
      }

    case `${REQUEST_DATA}_REJECTED`:
      return {
        ...state,
        [action.meta.chartId]: {
          ...state[action.meta.chartId],
          isFetching: false,
          error: action.error
        }
      }

    default:
      return state
  }
}
