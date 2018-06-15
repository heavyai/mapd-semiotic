import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { establishConnection } from './actions'
import './styles/App.css';

class App extends Component {
  static propTypes = {
    isConnecting: PropTypes.bool,
    connection: PropTypes.shape({}),
    error: PropTypes.shape({}),
    dispatch: PropTypes.func
  }

  componentDidMount() {
    this.props.dispatch(establishConnection())
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to MapD Semiotic</h1>
        </header>
      </div>
    );
  }
}

const mapStateToProps = ({ connection }) => {
  const { isConnecting, mapdCon, error } = connection
  return {
    isConnecting,
    mapdCon,
    error
  }
}

export default connect(mapStateToProps)(App)
