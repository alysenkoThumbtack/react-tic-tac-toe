import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Board from '../board/board.js';

import { makeMove, jumpToMove } from '../actions/actions';

import './game.css';

class Game extends React.Component {
  render() {
    const history = this.props.history;
    const current = history[this.props.currentMoveIndex];
    const winner = this.props.winner;
    const xIsNext = this.props.xIsNext;

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    const moves = history.map((move, index) => {
      const desc = index ?
        'Go to move #' + index :
        'Go to game start';

      return (
        <li key={index}>
          <button onClick={() => this.props.jumpToMove(index)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div>
          <Board
            squares={current.squares}
            status={status}
            onClick={(i) => this.props.makeMove(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    makeMove: (squareIndex) => dispatch(makeMove({
        squareIndex: squareIndex,
    })),
    jumpToMove: (moveIndex) => dispatch(jumpToMove({
        moveIndex: moveIndex,
    })),
  };
};

Game.propTypes = {
  history : PropTypes.array,
  xIsNext: PropTypes.bool,
  currentMoveIndex: PropTypes.number,
  winner: PropTypes.string,
  makeMove: PropTypes.func,
  jumpToMove: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
