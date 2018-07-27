import { createStore, applyMiddleware, compose } from "redux"
import reducer from "./reducers"
import middleware from "./middleware"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
)

export default store
