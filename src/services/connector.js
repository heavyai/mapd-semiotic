// eslint-disable-next-line
import MapDCon from '@mapd/connector/dist/browser-connector'

let connection = null

console.log(process.env.REACT_APP_MAPD_HOST)

function establishConnection() {
  const connector = new window.MapdCon()
  return new Promise((resolve, reject) => {
    connector
      .protocol(process.env.REACT_APP_MAPD_PROTOCOL)
      .host(process.env.REACT_APP_MAPD_HOST)
      .port(process.env.REACT_APP_MAPD_PORT)
      .dbName(process.env.REACT_APP_MAPD_DB)
      .user(process.env.REACT_APP_MAPD_USER)
      .password(process.env.REACT_APP_MAPD_PW)
      .connect((error, con) => {
        if (error) {
          reject(error)
        } else if (con) {
          console.log(con)
          resolve(con)
        }
      })
  })
}

async function getConnection(config) {
  try {
    const result = await establishConnection(config)
    return result
  } catch(error) {
    return error
  }
}

async function getConnectionStatus(con) {
  try {
    let result = await con.getStatusAsync()
    return result
  } catch(error) {
    return error
  }
}

async function queryMapd(query) {
  try {
    let result = await connection.queryAsync(query, {})
    return result
  } catch(error) {
    return error
  }
}

// store the connection once we've established it
function saveConnectionObj(con) {
  connection = con
}

export {
  getConnection,
  getConnectionStatus,
  queryMapd,
  saveConnectionObj
}
