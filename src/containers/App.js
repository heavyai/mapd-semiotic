import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { sendQuery } from "../actions"
import * as queries from "../common/queries"

import { filterCount, filterLine, filterBar } from "../common/filters"
import {
  countShouldFetchData,
  lineShouldFetchData,
  barShouldFetchData
} from "../common/shouldFetchData"

import "../styles/App.css"
import LineChart from "../components/LineChart"
import CountWidget from "../components/CountWidget"
import StackedBar from "../components/StackedBar"
import ClearFilters from "../components/ClearFilters"

class App extends Component {
  static propTypes = {
    data: PropTypes.shape({}),
    dispatch: PropTypes.func,
    line: PropTypes.shape({}),
    bar: PropTypes.shape({})
  }

  componentDidMount() {
    const { dispatch } = this.props
    // "total" technically is part of the "count" widget, but the ChartWrapper HOC
    // only allows for a single chartId so currently can only execute 1 query per chart
    dispatch(sendQuery(queries.total, { chartId: "total" }))
  }

  render() {
    const { line, bar, dispatch } = this.props
    const chartsState = { line, bar }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to MapD Semiotic</h1>
          <CountWidget
            dispatch={dispatch}
            chartId="count"
            chartsState={chartsState}
            shouldFetchData={countShouldFetchData}
            updateQuery={filterCount}
            count={this.props.data.count.rows}
            total={this.props.data.total.rows}
          />
          <ClearFilters {...{dispatch, bar, line}} />
        </header>
        <div className="charts-container">
          <LineChart
            chartId="line"
            chartsState={chartsState}
            shouldFetchData={lineShouldFetchData}
            updateQuery={filterLine}
            data={this.props.data.line.rows}
            dispatch={this.props.dispatch}
          />
          <StackedBar
            chartId="bar"
            chartsState={chartsState}
            shouldFetchData={barShouldFetchData}
            updateQuery={filterBar}
            data={this.props.data.bar.rows}
            dispatch={this.props.dispatch}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(App)
