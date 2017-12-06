import React, { Component } from 'react';
import './App.css';

import PlayingField from './PlayingField';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PlayingField width={3} height={3} />
      </div>
    );
  }
}

export default App;
