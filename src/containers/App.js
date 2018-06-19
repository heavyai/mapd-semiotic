import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import sls from 'single-line-string'

import { establishConnection, fetchData } from '../actions'
import { table } from '../common/config'
import LineChart from '../components/LineChart'
import '../styles/App.css';

class App extends Component {
  static propTypes = {
    isConnecting: PropTypes.bool,
    isFetching: PropTypes.bool,
    connection: PropTypes.shape({}),
    dispatch: PropTypes.func,
    rows: PropTypes.arrayOf(PropTypes.shape({}))
  }

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

  queryRowCount = `SELECT count(*) AS val FROM ${table}` // to do: where clause

  componentDidMount() {
    // create and save the connection to the mapd db
    this.props.dispatch(establishConnection())
  }

  componentDidUpdate() {
    const { dispatch, mapdCon, isConnecting, isFetching, rows } = this.props

    if (mapdCon && !isConnecting && !rows && !isFetching) {
      dispatch(fetchData(mapdCon, this.queryLineChart, { chartId: 'line' }))
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to MapD Semiotic</h1>
        </header>
        { this.props.rows && <LineChart data={this.props.rows} /> }
      </div>
    );
  }
}

const mapStateToProps = ({ connection, data: { line } }) => {
  const { isConnecting, mapdCon } = connection
  const { isFetching, rows } = line
  return {
    isConnecting,
    isFetching,
    mapdCon,
    rows
  }
}

export default connect(mapStateToProps)(App)
