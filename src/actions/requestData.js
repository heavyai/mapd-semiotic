import { REQUEST_DATA } from "../common/actionTypes"
import { queryMapd } from "../services/connector"

export const fetchData = query => ({
  type: REQUEST_DATA,
  payload: queryMapd(query)
})
