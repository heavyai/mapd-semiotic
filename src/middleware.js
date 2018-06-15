import promiseMiddleware from 'redux-promise-middleware'
import { createLogger } from 'redux-logger';

const middleware = [ promiseMiddleware() ]

if (process.env.NODE_ENV === "development") {
  middleware.push(createLogger())
}

export default middleware
