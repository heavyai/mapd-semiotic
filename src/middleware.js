import promiseMiddleware from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

const middleware = [ thunk, promiseMiddleware() ]

if (process.env.NODE_ENV === "development") {
  middleware.push(createLogger())
}

export default middleware
