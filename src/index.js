import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Restart({ onClick }) {
  return (
    <button className="restart" onClick={onClick}>
      Play again
    </button>
  );
}

ReactDOM.render(<Square />, document.getElementById("root"));

function Game() {
  const [squares, setsquares] = useState(Array(9).fill(null));
  const [turn, flip] = useState(true);
  const winner = calculateWinner(squares);

  function currentstate(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          if (squares[i] != null || winner != null) return;
          const newsquares = squares.slice();
          newsquares[i] = turn ? "X" : "O";
          setsquares(newsquares);
          flip(!turn);
        }}
      />
    );
  }
  function calculateWinner(squares) {
    const possibleLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    // go over all possibly winning lines and check if they consist of only X's/only O's
    for (let i = 0; i < possibleLines.length; i++) {
      const [a, b, c] = possibleLines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  function isBoardFull(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] == null) {
        return false;
      }
    }
    return true;
  }
  function getStatus() {
    if (winner) {
      return "Winner: " + winner;
    } else if (isBoardFull(squares)) {
      return "Draw!";
    } else {
      return "Current Turn : " + (turn ? "X" : "O");
    }
  }
  function restartbutton() {
    return (
      <Restart
        onClick={() => {
          setsquares(Array(9).fill(null));
          flip(true);
        }}
      />
    );
  }

  return (
    <div className="container">
      <div className="game">
        <div className="game-board">
          <div className="board-row">
            {currentstate(0)}
            {currentstate(1)}
            {currentstate(2)}
          </div>
          <div className="board-row">
            {currentstate(3)}
            {currentstate(4)}
            {currentstate(5)}
          </div>
          <div className="board-row">
            {currentstate(6)}
            {currentstate(7)}
            {currentstate(8)}
          </div>
        </div>
        <div className="game-info">{getStatus()}</div>
        <div className="restart-button">{restartbutton()}</div>
      </div>
    </div>
  );
}

ReactDOM.render(<Game />, document.getElementById("root"));
