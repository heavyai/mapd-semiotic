import { CONNECT_TO_DB } from '../common/actionTypes'
import { getConnection } from '../services/connector'

export const establishConnection = () => dispatch => dispatch({
  type: CONNECT_TO_DB,
  payload: getConnection()
})
.catch(error => {
  console.error(error)
})
