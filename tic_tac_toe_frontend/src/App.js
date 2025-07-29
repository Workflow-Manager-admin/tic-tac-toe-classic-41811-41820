import React, { useState } from 'react';
import './App.css';

/**
 * Modern, minimal, and responsive Tic Tac Toe Game.
 * Features: 3x3 interactive grid, turn indicator, win/tie detection, and restart.
 * Color palette: accent: #E53935, primary: #1976D2, secondary: #FFC107
 * Light minimalistic theme, responsive layout.
 */

// Utility functions
const initialBoard = () => Array(9).fill(null);

const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // columns
  [0,4,8],[2,4,6]          // diagonals
];

// PUBLIC_INTERFACE
function calculateWinner(squares) {
  /** Returns "X" or "O" if winner, null otherwise. */
  for (let [a, b, c] of WIN_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
function isBoardFull(squares) {
  /** Returns true if every cell is non-null. */
  return squares.every(Boolean);
}

// PUBLIC_INTERFACE
function App() {
  // State
  const [board, setBoard] = useState(initialBoard());
  const [xIsNext, setXIsNext] = useState(true);

  // Derived state
  const winner = calculateWinner(board);
  const tie = !winner && isBoardFull(board);
  const currentPlayer = xIsNext ? 'X' : 'O';

  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    // Prevent changing a played cell or playing after game end
    if (board[idx] || winner) return;
    const newBoard = board.slice();
    newBoard[idx] = currentPlayer;
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(initialBoard());
    setXIsNext(true);
  }

  // Minimal game status message
  let statusMsg;
  if (winner) {
    statusMsg = `Player ${winner} wins!`;
  } else if (tie) {
    statusMsg = "It's a tie!";
  } else {
    statusMsg = `Player ${currentPlayer}'s turn`;
  }

  // Color settings
  const colors = {
    accent: "#E53935",
    primary: "#1976D2",
    secondary: "#FFC107"
  };

  // Render one square
  function Square({ value, onClick }) {
    // Accent color for winner cells
    const highlight = winner && value === winner ? { color: colors.accent } : {};
    return (
      <button
        className="ttt-square"
        style={highlight}
        aria-label={value ? `Cell: ${value}` : 'Empty cell'}
        onClick={onClick}
        tabIndex={value ? -1 : 0}
      >
        {value}
      </button>
    );
  }

  // Render status area
  function Status() {
    return (
      <div className="ttt-status" data-testid="status">
        {statusMsg}
      </div>
    );
  }

  // PUBLIC_INTERFACE
  return (
    <div className="ttt-app">
      <main className="ttt-main-container">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <Status />
        <div className="ttt-board" role="grid" aria-label="Tic Tac Toe Board">
          {board.map((val, idx) => (
            <Square
              key={idx}
              value={val}
              onClick={() => handleSquareClick(idx)}
            />
          ))}
        </div>
        <div className="ttt-controls">
          {(winner || tie) && (
            <button className="ttt-btn-primary" onClick={handleRestart} aria-label="Restart game">
              Restart Game
            </button>
          )}
        </div>
        <footer className="ttt-footer">
          <span className="ttt-footer-credit">Minimal Tic Tac Toe • React • Kavia</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
