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
    fetch('/api/hello')
        .then(response => response.json())
        .then(data => this.setState({
            helloMessage: data.msg
          })
        )
  }

}

export default App;
