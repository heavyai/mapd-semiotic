import { SEND_QUERY } from '../common/actionTypes'

export const sendQuery = (statement, metadata) =>
  async (dispatch, getState, getConnector) => {
    const connector = await getConnector
    return dispatch({
      type: SEND_QUERY,
      payload: connector.queryAsync(statement),
      meta: metadata
    })
  }
