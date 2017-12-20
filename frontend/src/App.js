import React, { Component } from 'react';
import './App.css';

import PlayingField from './PlayingField';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helloMessage: ""
    };
  }

  render() {
    return (
      <div className="App">
        <PlayingField width={3} height={3} />
        {this.state.helloMessage}
      </div>
    );
  }

  componentDidMount() {
    fetch('/api/game-create', {method: 'POST'})
        .then(response => response.json())
        .then(data => {
          let gameId = data.gameId;
          fetch('/api/game-connect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameId })
          })
              .then(response => response.text())
              .then(text => console.log(text));
        });
  }

}

export default App;
