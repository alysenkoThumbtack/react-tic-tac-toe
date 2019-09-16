import { MAKE_MOVE, JUMP_TO_MOVE } from '../actions/action-types';

import { updateObject } from './utils';

const initialState = {
  history : [{
    squares : Array(9).fill(null),
  }],
  xIsNext: true,
  currentMoveIndex: 0,
  winner: null,
}

function gameReducer(state = initialState, action) {
  switch (action.type) {
    case MAKE_MOVE:
      return makeMove(state, action);
    case JUMP_TO_MOVE:
      return jumpToMove(state, action);
    default:
      return state;
  }
}

function makeMove(state, action) {
  const squareIndex = action.payload.squareIndex;

  const history = state.history.slice(0, state.currentMoveIndex + 1);
  const current = history[history.length - 1];

  const squares = current.squares.slice();

  if (state.winner || squares[squareIndex]) {
    return state;
  }

  squares[squareIndex] = state.xIsNext ? 'X' : 'O';
  const winner = calculateWinner(squares);

  let newState = updateObject(state, {
    history: history.concat([{
      squares: squares
    }]),
    currentMoveIndex: history.length,
    xIsNext: !state.xIsNext,
    winner: winner,
  });

  return newState;
}

function jumpToMove(state, action) {
  const moveIndex = action.payload.moveIndex;

  const history = state.history.slice(0, moveIndex + 1);
  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);

  let newState = updateObject(state, {
    currentMoveIndex : moveIndex,
    xIsNext: moveIndex % 2 === 0,
    winner: winner,
  });

  return newState;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default gameReducer;
