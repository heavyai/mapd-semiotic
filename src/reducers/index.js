import { combineReducers } from "redux"

import data from "./dataReducer"
import line from "./lineReducer"

const rootReducer = combineReducers({
  data,
  line
})

export default rootReducer
