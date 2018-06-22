import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import sls from "single-line-string"

import { sendQuery } from "../actions"
import { table } from "../common/config"
import LineChart from "../components/LineChart"
import CountWidget from "../components/CountWidget"
import "../styles/App.css"

class App extends Component {
  static propTypes = {
    data: PropTypes.shape({}),
    dispatch: PropTypes.func,
  }

  // TO DO: mv queries to separate module & refactor to accept where clause filters
  queryLineChart = sls`
    SELECT date_trunc(month, dep_timestamp) as key0,
    CASE
      WHEN origin IN ('ORD','ATL','DFW','LAX','PHX')
      THEN origin
      ELSE 'other'
    END as key1,
    COUNT(*) AS val
    FROM ${table}
    GROUP BY key0, key1
    ORDER BY key0, key1`

  queryScatterPlot = sls`
    SELECT depdelay as x,
    arrdelay as y,
    airtime as size,
    carrier_name as color
    FROM ${table}
    LIMIT 200000
  `

  queryCount = `SELECT count(*) AS val FROM ${table}` // to do: where clause

  queryTotal = `SELECT count(*) AS val FROM ${table}`

  componentDidMount() {
    const { dispatch, data } = this.props

    // kick off network requests for requesting the charts data
    if (!data.line.rows && !data.line.isFetching) {
      dispatch(sendQuery(this.queryLineChart, { chartId: "line" }))
    }

    if (!data.count.rows && !data.count.isFetching) {
      dispatch(sendQuery(this.queryCount, { chartId: "count" }))
    }

    if (!data.total.rows && !data.total.isFetching) {
      dispatch(sendQuery(this.queryTotal, { chartId: "total" }))
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
          <LineChart data={this.props.data.line.rows} />
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ data }) => ({ data })

export default connect(mapStateToProps)(App)
