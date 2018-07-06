import React, { Component } from "react"
import PropTypes from "prop-types"

import { sendQuery } from "../actions"
import * as queries from "../common/queries"

// HOC component to wrap functional chart components in, in order to:
// 1. fetch their data when they mount
// 2. determine if their data should be updated when charting state changes
// 3. destroy their data and state when they unmount (TO DO)
const ChartWrapper = (WrappedComponent) => {
  return class extends Component {
    static propTypes = {
      chartId: PropTypes.string.isRequired,
      chartsState: PropTypes.shape({}),
      shouldFetchData: PropTypes.func,
      updateQuery: PropTypes.func,
      dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
      const { dispatch, chartId } = this.props
      // make initial request for chart data
      dispatch(sendQuery(queries[chartId], { chartId }))
    }

    componentDidUpdate(prevProps) {
      const { chartId, chartsState, shouldFetchData, updateQuery, dispatch } = this.props
      // determine if new data should be fetched based on state of charts
      if (shouldFetchData(chartsState, prevProps.chartsState)) {
        const newQuery = updateQuery(chartsState)
        dispatch(sendQuery(newQuery, { chartId }))
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

export default ChartWrapper
