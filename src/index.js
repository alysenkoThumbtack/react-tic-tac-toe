import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'

import store from './store'

import Game from './game/game.js'

import './index.css';

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  rootElement
);
