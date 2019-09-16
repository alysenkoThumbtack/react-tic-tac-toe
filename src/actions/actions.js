import { MAKE_MOVE, JUMP_TO_MOVE } from './action-types';

/**
 * List of functions for action dispatching
 * (call them in `mapDispatchToProps`).
 */

export function makeMove(payload) {
  return { type: MAKE_MOVE, payload: payload };
}

export function jumpToMove(payload) {
  return { type: JUMP_TO_MOVE, payload: payload };
}
