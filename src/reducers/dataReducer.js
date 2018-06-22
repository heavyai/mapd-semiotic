import { SEND_QUERY } from "../common/actionTypes"

const stateTemplate = {
  isFetching: false,
  rows: null,
  error: null
}

const defaultState = {
  line: { ...stateTemplate },
  count: { ...stateTemplate },
  total: { ...stateTemplate }
}

export default function(state = defaultState, action) {
  switch(action.type) {
    case `${SEND_QUERY}_PENDING`:
      return {
        ...state,
        [action.meta.chartId]: {
          ...state[action.meta.chartId],
          isFetching: true
        }
      }

    case `${SEND_QUERY}_FULFILLED`:
      return {
        ...state,
        [action.meta.chartId]: {
          ...state[action.meta.chartId],
          isFetching: false,
          rows: action.payload
        }
      }

    case `${SEND_QUERY}_REJECTED`:
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
