import { combineReducers } from "redux"

import data from "./dataReducer"
import line from "./lineReducer"
import bar from "./barReducer"

const rootReducer = combineReducers({
  bar,
  data,
  line
})

export default rootReducer
