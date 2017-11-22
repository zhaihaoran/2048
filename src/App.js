import React, { Component } from 'react';
import {createStore,combineReducers} from 'redux'
import {Provider} from 'react-redux'

import "./css/animate.css"
// reducer
import game from "./reducer/game"
import cube from "./reducer/cube"

import Board from "./container/board.jsx"

const reducer = combineReducers({game, cube})
const store = createStore(reducer)

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
