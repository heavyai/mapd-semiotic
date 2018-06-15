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

  query = sls`
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

  componentDidMount() {
    // create and save the connection to the mapd db
    this.props.dispatch(establishConnection())
  }

  componentDidUpdate() {
    const { dispatch, mapdCon, isConnecting, rows } = this.props

    if (mapdCon && !isConnecting && !rows) {
      dispatch(fetchData(mapdCon, this.query))
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

const mapStateToProps = ({ connection, data }) => {
  const { isConnecting, mapdCon } = connection
  const { isFetching, rows } = data
  return {
    isConnecting,
    isFetching,
    mapdCon,
    rows
  }
}

export default connect(mapStateToProps)(App)
