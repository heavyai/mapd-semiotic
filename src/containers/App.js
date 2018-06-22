import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { timeFormat } from 'd3-time-format'

import { sendQuery } from "../actions"
import * as queries from "../common/queries"
import LineChart from "../components/LineChart"
import CountWidget from "../components/CountWidget"
import "../styles/App.css"

const dateFormatter = timeFormat('%Y-%m-%d %H:%M:%S')

class App extends Component {
  static propTypes = {
    data: PropTypes.shape({}),
    dispatch: PropTypes.func,
  }

  componentDidMount() {
    const { dispatch, data } = this.props

    // kick off network requests for requesting the charts data
    if (!data.line.rows && !data.line.isFetching) {
      dispatch(sendQuery(queries.queryLineChart, { chartId: "line" }))
    }

    if (!data.count.rows && !data.count.isFetching) {
      dispatch(sendQuery(queries.queryCount, { chartId: "count" }))
    }

    if (!data.total.rows && !data.total.isFetching) {
      dispatch(sendQuery(queries.queryTotal, { chartId: "total" }))
    }
  }

  componentDidUpdate(prevProps) {
    const { dispatch, line } = this.props

    if (line.brush && line.brush.length) {
      let newQueryTotal = `${queries.queryTotal}`

      if (!prevProps.line.brush) {
        newQueryTotal = `${newQueryTotal} WHERE (dep_timestamp >= TIMESTAMP(0) '${dateFormatter(line.brush[0])}' AND dep_timestamp <= TIMESTAMP(0) '${dateFormatter(line.brush[1])}')`
        dispatch(sendQuery(newQueryTotal, { chartId: "count" }))

      } else if (prevProps.line.brush && (line.brush[0] !== prevProps.line.brush[0] || line.brush[1] !== prevProps.line.brush[1])) {
        newQueryTotal = `${newQueryTotal} WHERE (dep_timestamp >= TIMESTAMP(0) '${dateFormatter(line.brush[0])}' AND dep_timestamp <= TIMESTAMP(0) '${dateFormatter(line.brush[1])}')`
        dispatch(sendQuery(newQueryTotal, { chartId: "count" }))
      }

    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to MapD Semiotic</h1>
          <CountWidget
            count={this.props.data.count.rows}
            total={this.props.data.total.rows}
          />
        </header>
        {this.props.data.line.rows && (
          <LineChart
            data={this.props.data.line.rows}
            dispatch={this.props.dispatch}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ data, line }) => ({ data, line })

export default connect(mapStateToProps)(App)
