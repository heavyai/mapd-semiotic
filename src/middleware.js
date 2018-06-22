import promiseMiddleware from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import connector from './services/connector'

// we pass in the connector (which is a promise) as an extra argument to our thunk middleware
// see actions/query.js for how it is used
const middleware = [
  thunk.withExtraArgument(connector),
  promiseMiddleware()
]

// only use redux logger in dev mode
if (process.env.NODE_ENV === "development") {
  middleware.push(createLogger())
}

export default middleware
