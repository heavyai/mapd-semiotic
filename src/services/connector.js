// eslint-disable-next-line no-unused-vars
import MapdCon from '@mapd/connector/dist/browser-connector'

// the value of connector here is a Promise
const connector = new window.MapdCon()
  .protocol(process.env.REACT_APP_MAPD_PROTOCOL)
  .host(process.env.REACT_APP_MAPD_HOST)
  .port(process.env.REACT_APP_MAPD_PORT)
  .dbName(process.env.REACT_APP_MAPD_DB)
  .user(process.env.REACT_APP_MAPD_USER)
  .password(process.env.REACT_APP_MAPD_PW)
  .connectAsync()

export default connector
