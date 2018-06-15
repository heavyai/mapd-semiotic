import { combineReducers } from "redux"

import data from "./dataReducer"
import connection from "./connectionReducer"

const rootReducer = combineReducers({
  connection,
  data,
})

export default rootReducer
