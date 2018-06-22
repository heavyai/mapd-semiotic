import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { sendQuery } from "../actions"
import * as queries from "../common/queries"
import dataLayer from "../services/dataLayer"

import "../styles/App.css"
import LineChart from "../components/LineChart"
import CountWidget from "../components/CountWidget"

class App extends Component {
  static propTypes = {
    data: PropTypes.shape({}),
    dispatch: PropTypes.func
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
    const { line } = this.props

    if (line.brush && line.brush.length) {

      if (!prevProps.line.brush) {
        this.filterTotal(line.brush)
      } else if (
        prevProps.line.brush &&
        (line.brush[0] !== prevProps.line.brush[0] ||
          line.brush[1] !== prevProps.line.brush[1])
      ) {
        this.filterTotal(line.brush)
      }

    }
  }

  filterTotal = brush => {
    const filterObj = dataLayer({ dateRange: brush })
    const newQueryTotal = `${queries.queryTotal} WHERE ${
      filterObj.dateFilterStr
    }`
    this.props.dispatch(sendQuery(newQueryTotal, { chartId: "count" }))
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
