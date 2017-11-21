import React, { Component } from 'react';
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import gameReducer from "./reducer/game"
import Board from "./container/board.jsx"

const store = createStore(gameReducer)

class App extends Component {

  render() {
    return (
      <div className="App" >
        <Provider store={store}>
          <Board />
        </Provider>
      </div>
    );
  }
}

export default App;
