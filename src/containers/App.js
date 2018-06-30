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
    dispatch: PropTypes.func,
    line: PropTypes.shape({}),
    bar: PropTypes.shape({})
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
    const { line, bar } = this.props

    if (line.brush && line.brush.length) {
      if (!prevProps.line.brush) {
        this.filterCount(line.brush, bar.selected.key0, bar.selected.key1)
      } else if (
        prevProps.line.brush &&
        (line.brush[0] !== prevProps.line.brush[0] ||
          line.brush[1] !== prevProps.line.brush[1])
      ) {
        this.filterCount(line.brush, bar.selected.key0, bar.selected.key1)
      }
    }

    if (
      prevProps.bar.selected.key0 !== bar.selected.key0 ||
      prevProps.bar.selected.key1 !== bar.selected.key1
    ) {
      this.filterCount(line.brush, bar.selected.key0, bar.selected.key1)
    }
  }

  // updates data for the count widget
  filterCount = (brush, city, carrier) => {
    const filterStrings = dataLayer({
      dateRange: brush,
      destCity: city,
      carrierName: carrier
    })

    let newQueryCount = `${queries.count}`
    let hasFilters = false

    for (let key in filterStrings) {
      if (filterStrings[key] && filterStrings[key].length) {
        hasFilters = true
        break;
      }
    }

    if (hasFilters) {
      newQueryCount = Object.keys(filterStrings)
      .filter(key => filterStrings[key].length)
      .reduce((acc, cur, idx) => {
        const filterStr = filterStrings[cur]

        if (filterStr.length) {
          if (idx > 0) {
            acc = `${acc} AND ${filterStr}`
          } else {
            acc = `${acc} ${filterStr}`
          }
        }

        return acc
      }, `${newQueryCount} WHERE `)
    }

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

const mapStateToProps = ({ data, line, bar }) => ({ data, line, bar })

export default connect(mapStateToProps)(App)
