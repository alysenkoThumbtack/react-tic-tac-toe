import { createStore, applyMiddleware } from 'redux';

import gameReducer from './reducers/gameReducer';

import { logger, crashReporter } from './middlewares';

const store = createStore(
  gameReducer,
  applyMiddleware(logger, crashReporter)
);

export default store;
