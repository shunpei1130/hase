import React, { useState, useEffect } from 'react';

const BOARD_SIZE = 8;
const EMPTY = 0;
const BLACK = 1;
const WHITE = 2;

const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1]
];

const initialBoard = () => {
  const board = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(EMPTY));
  const mid = BOARD_SIZE / 2;
  board[mid-1][mid-1] = WHITE;
  board[mid-1][mid] = BLACK;
  board[mid][mid-1] = BLACK;
  board[mid][mid] = WHITE;
  return board;
};

// 位置の重要度を示す評価マップ
const POSITION_WEIGHTS = [
  [120, -20, 20,  5,  5, 20, -20, 120],
  [-20, -40, -5, -5, -5, -5, -40, -20],
  [ 20,  -5, 15,  3,  3, 15,  -5,  20],
  [  5,  -5,  3,  3,  3,  3,  -5,   5],
  [  5,  -5,  3,  3,  3,  3,  -5,   5],
  [ 20,  -5, 15,  3,  3, 15,  -5,  20],
  [-20, -40, -5, -5, -5, -5, -40, -20],
  [120, -20, 20,  5,  5, 20, -20, 120]
];

const OthelloGame = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState(BLACK);
  const [gameOver, setGameOver] = useState(false);
  const [isCPUOpponent, setIsCPUOpponent] = useState(false);

  useEffect(() => {
    if (isCPUOpponent && currentPlayer === WHITE && !gameOver) {
      const timer = setTimeout(() => {
        makeCPUMove();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [board, currentPlayer, gameOver, isCPUOpponent]);

  useEffect(() => {
    if (!canMove(board, currentPlayer)) {
      if (!canMove(board, 3 - currentPlayer)) {
        setGameOver(true);
      } else {
        setCurrentPlayer(3 - currentPlayer);
      }
    }
  }, [board, currentPlayer]);

  const canMove = (board, player) => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (isValidMove(board, i, j, player)) {
          return true;
        }
      }
    }
    return false;
  };

  const isValidMove = (board, row, col, player) => {
    if (board[row][col] !== EMPTY) return false;

    for (const [dx, dy] of DIRECTIONS) {
      let x = row + dx;
      let y = col + dy;
      let canFlip = false;

      while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
        if (board[x][y] === EMPTY) break;
        if (board[x][y] === player) {
          if (canFlip) return true;
          break;
        }
        canFlip = true;
        x += dx;
        y += dy;
      }
    }

    return false;
  };

  const makeMove = (row, col) => {
    if (gameOver || !isValidMove(board, row, col, currentPlayer)) return;

    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = currentPlayer;

    for (const [dx, dy] of DIRECTIONS) {
      let x = row + dx;
      let y = col + dy;
      const toFlip = [];

      while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
        if (newBoard[x][y] === EMPTY) break;
        if (newBoard[x][y] === currentPlayer) {
          for (const [fx, fy] of toFlip) {
            newBoard[fx][fy] = currentPlayer;
          }
          break;
        }
        toFlip.push([x, y]);
        x += dx;
        y += dy;
      }
    }

    setBoard(newBoard);
    setCurrentPlayer(3 - currentPlayer);
  };

  const evaluateBoard = (board, player) => {
    let score = 0;
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (board[i][j] === player) {
          score += POSITION_WEIGHTS[i][j];
        } else if (board[i][j] === 3 - player) {
          score -= POSITION_WEIGHTS[i][j];
        }
      }
    }
    return score;
  };

  const getValidMoves = (board, player) => {
    const validMoves = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (isValidMove(board, i, j, player)) {
          validMoves.push([i, j]);
        }
      }
    }
    return validMoves;
  };

  const minimax = (board, depth, maximizingPlayer, alpha, beta) => {
    if (depth === 0 || !canMove(board, BLACK) && !canMove(board, WHITE)) {
      return evaluateBoard(board, WHITE);
    }

    const player = maximizingPlayer ? WHITE : BLACK;
    const validMoves = getValidMoves(board, player);

    if (maximizingPlayer) {
      let maxEval = -Infinity;
      for (const [row, col] of validMoves) {
        const newBoard = board.map(row => [...row]);
        makeMove(row, col);
        const evalScore = minimax(newBoard, depth - 1, false, alpha, beta);
        maxEval = Math.max(maxEval, evalScore);
        alpha = Math.max(alpha, evalScore);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const [row, col] of validMoves) {
        const newBoard = board.map(row => [...row]);
        makeMove(row, col);
        const evalScore = minimax(newBoard, depth - 1, true, alpha, beta);
        minEval = Math.min(minEval, evalScore);
        beta = Math.min(beta, evalScore);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  };

  const makeCPUMove = () => {
    const validMoves = getValidMoves(board, WHITE);
    let bestScore = -Infinity;
    let bestMove = null;

    for (const [row, col] of validMoves) {
      const newBoard = board.map(row => [...row]);
      newBoard[row][col] = WHITE;
      const score = minimax(newBoard, 3, false, -Infinity, Infinity);
      if (score > bestScore) {
        bestScore = score;
        bestMove = [row, col];
      }
    }

    if (bestMove) {
      makeMove(bestMove[0], bestMove[1]);
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer(BLACK);
    setGameOver(false);
  };

  const countPieces = () => {
    let black = 0;
    let white = 0;
    for (const row of board) {
      for (const cell of row) {
        if (cell === BLACK) black++;
        if (cell === WHITE) white++;
      }
    }
    return { black, white };
  };

  const { black, white } = countPieces();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-4xl font-bold mb-4">オセロ</h1>
      <div className="mb-4">
        <span className="mr-4">黒: {black}</span>
        <span>白: {white}</span>
      </div>
      <div className="grid grid-cols-8 gap-1 bg-green-700 p-2">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <button
              key={`${i}-${j}`}
              className={`w-12 h-12 rounded-full ${
                cell === EMPTY ? 'bg-green-500' :
                cell === BLACK ? 'bg-black' : 'bg-white'
              }`}
              onClick={() => makeMove(i, j)}
              disabled={gameOver || cell !== EMPTY || (isCPUOpponent && currentPlayer === WHITE)}
            />
          ))
        )}
      </div>
      <div className="mt-4">
        {gameOver ? (
          <p className="text-xl font-bold">
            ゲーム終了! {black > white ? '黒' : white > black ? '白' : '引き分け'}の勝ち!
          </p>
        ) : (
          <p className="text-xl">現在の手番: {currentPlayer === BLACK ? '黒' : '白'}</p>
        )}
      </div>
      <div className="mt-4 space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={resetGame}
        >
          ゲームをリセット
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => setIsCPUOpponent(!isCPUOpponent)}
        >
          {isCPUOpponent ? "2人プレイに切り替え" : "CPUと対戦"}
        </button>
      </div>
    </div>
  );
};

export default OthelloGame;
