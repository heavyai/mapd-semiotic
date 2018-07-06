import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { sendQuery } from "../actions"
import * as queries from "../common/queries"
import dataLayer from "../services/dataLayer"

import { filterCount } from "../common/filters"
import { countShouldFetchData } from "../common/shouldFetchData"

import "../styles/App.css"
import LineChart from "../components/LineChart"
import CountWidget from "../components/CountWidget"
import StackedBar from "../components/StackedBar"

class App extends Component {
  static propTypes = {
    data: PropTypes.shape({}),
    dispatch: PropTypes.func,
    line: PropTypes.shape({}),
    bar: PropTypes.shape({})
  }

  componentDidMount() {
    const { dispatch, data } = this.props

    // kick off network requests for fetching each chart's data
    for (let key in data) {
      if (!data[key].rows && !data[key].isFetching && key !== "count") {
        dispatch(sendQuery(queries[key], { chartId: `${key}` }))
      }
    }
  }

  render() {
    const { line, bar, dispatch } = this.props

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to MapD Semiotic</h1>
          <CountWidget
            dispatch={dispatch}
            chartId={"count"}
            chartsState={{line, bar}}
            shouldFetchData={countShouldFetchData}
            updateQuery={filterCount}
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

const mapStateToProps = ({ data, line, bar }) => ({ data, line, bar })

export default connect(mapStateToProps)(App)
