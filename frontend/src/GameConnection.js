import React, { Component } from 'react';

import gameConnectionApi from './api/gameConnection';

import './PlayingField.css';


class GameConnection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameId: null,
        };
    }

    render() {
        if (!this.state.gameId) {
            return (
                <div className="GameConnection">
                    <button onClick={this.start.bind(this)}>
                        Start a new game
                    </button>
                    <button onClick={this.connect.bind(this)}>
                        Connect to existed game
                    </button>
                </div>
            )
        }
        else {
            return (
                <div className="GameConnection">
                    <h2>Your game id is
                        <input type="text" value={this.state.gameId}
                               readOnly={true}/>
                    </h2>
                    <button onClick={this.disconnect.bind(this)}>
                        Disconnect
                    </button>
                </div>
            );
        }
    }

    start() {
        gameConnectionApi.create()
            .then(response => {
                this.setState({
                    ...this.state,
                    gameId: response.data.gameId,
                });
            });
    }

    connect() {
        let gameId = prompt('Type gameId');
        gameConnectionApi.connect(gameId)
            .then(response => {
                this.setState({
                    ...this.state,
                    gameId,
                });
            })
            .catch(error => {
                alert(error.response.data.message || 'Something went wrong');
            })
    }

    disconnect() {
        gameConnectionApi.disconnect()
            .then(response => {
                this.setState({
                    ...this.state,
                    gameId: null,
                });
            })
            .catch(error => {
                alert(error.response.data.message || 'Something went wrong');
            })
    }
}

export default GameConnection;
