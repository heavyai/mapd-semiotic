import React, { Component } from 'react';
import './styles/App.css';
import { getConnection, saveConnectionObj } from './services/connector'

class App extends Component {
  componentDidMount() {
    getConnection()
      .then(con => {
        saveConnectionObj(con)
      })
      .catch(error => {
        throw Error(`Connection unsuccessful, message: ${error.message}`)
      })
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

export default App;
