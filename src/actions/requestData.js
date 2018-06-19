import { REQUEST_DATA } from "../common/actionTypes"
import { queryMapd } from "../services/connector"

export const fetchData = (connection, query, meta) => dispatch => dispatch({
  type: REQUEST_DATA,
  payload: queryMapd(connection, query),
  meta
})
.catch(error => {
  console.error(error)
})
