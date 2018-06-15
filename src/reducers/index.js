import { combineReducers } from "redux"

import data from "./dataReducer"

const rootReducer = combineReducers({
  data,
})

export default rootReducer
