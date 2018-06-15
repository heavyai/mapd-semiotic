import { CONNECT_TO_DB } from "../common/actionTypes"

const defaultState = {
  isConnecting: false,
  mapdCon: null,
  error: null
}

export default function(state = defaultState, action) {
  switch(action.type) {
    case `${CONNECT_TO_DB}_PENDING`:
      return {
        ...state,
        isConnecting: true
      }

    case `${CONNECT_TO_DB}_FULFILLED`:
      return {
        ...state,
        isConnecting: false,
        mapdCon: action.payload
      }

    case `${CONNECT_TO_DB}_REJECTED`:
      return {
        ...state,
        isConnecting: false,
        error: action.payload
      }

    default:
      return state
  }
}
