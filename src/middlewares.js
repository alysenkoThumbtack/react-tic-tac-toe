/**
  Available Redux store Middlewares.
*/

import Raven from 'react-raven';

/**
 * Logs all actions and states after they are dispatched.
 */
export const logger = store => next => action => {
  console.group(action.type);
  console.log('dispatching', action);

  let result = next(action);

  console.log('next state', store.getState());
  console.groupEnd();

  return result;
}

/**
 * Sends crash reports as state is updated and listeners are notified.
 */
export const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (error) {
    console.error('Caught an exception!', error);
    Raven.captureException(error, {
      extra: {
        action,
        state: store.getState()
      }
    });

    throw error;
  }
}
