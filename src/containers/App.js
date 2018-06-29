import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { sendQuery } from "../actions"
import * as queries from "../common/queries"
import dataLayer from "../services/dataLayer"

import "../styles/App.css"
import LineChart from "../components/LineChart"
import CountWidget from "../components/CountWidget"
import StackedBar from "../components/StackedBar"

class App extends Component {
  static propTypes = {
    data: PropTypes.shape({}),
    dispatch: PropTypes.func
  }

  componentDidMount() {
    const { dispatch, data } = this.props

    // kick off network requests for fetching each chart's data
    for (let key in data) {
      if (!data[key].rows && !data[key].isFetching) {
        dispatch(sendQuery(queries[key], { chartId: `${key}` }))
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { line } = this.props

    if (line.brush && line.brush.length) {

      if (!prevProps.line.brush) {
        this.filterCount(line.brush)
      } else if (
        prevProps.line.brush &&
        (line.brush[0] !== prevProps.line.brush[0] ||
          line.brush[1] !== prevProps.line.brush[1])
      ) {
        this.filterCount(line.brush)
      }

    }
  }

  filterCount = brush => {
    const filterObj = dataLayer({ dateRange: brush })
    const newQueryCount = `${queries.count} WHERE ${
      filterObj.dateFilterStr
    }`
    this.props.dispatch(sendQuery(newQueryCount, { chartId: "count" }))
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
        {this.props.data.bar.rows && (
          <StackedBar
            data={this.props.data.bar.rows}
            dispatch={this.props.dispatch}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ data, line }) => ({ data, line })

export default connect(mapStateToProps)(App)
