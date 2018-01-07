import React, { Component } from 'react';
import './App.css';

import PlayingField from './PlayingField';
import GameConnection from "./GameConnection";

class App extends Component {

  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <GameConnection />
        <PlayingField width={3} height={3} />
      </div>
    );
  }

  componentDidMount() {
  }

}

export default App;
