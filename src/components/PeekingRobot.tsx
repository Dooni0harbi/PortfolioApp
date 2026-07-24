import { useState } from "react";

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function getWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return board.every(Boolean) ? "draw" : null;
}

// ذكاء بسيط: يحاول يفوز، وإلا يصد، وإلا ياخذ الوسط، وإلا عشوائي
function botMove(board) {
  const empty = board.map((v, i) => (v ? null : i)).filter((i) => i !== null);

  for (const i of empty) {
    const copy = [...board];
    copy[i] = "O";
    if (getWinner(copy) === "O") return i;
  }
  for (const i of empty) {
    const copy = [...board];
    copy[i] = "X";
    if (getWinner(copy) === "X") return i;
  }
  if (!board[4]) return 4;
  const corners = [0, 2, 6, 8].filter((i) => !board[i]);
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
  return empty[Math.floor(Math.random() * empty.length)];
}

export default function PeekingRobot() {
  const [visible, setVisible] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("player"); // player = X, bot = O

  const winner = getWinner(board);

  const playerMove = (i) => {
    if (board[i] || winner || turn !== "player") return;
    const next = [...board];
    next[i] = "X";
    setBoard(next);
    setTurn("bot");

    if (!getWinner(next)) {
      setTimeout(() => {
        const botI = botMove(next);
        const afterBot = [...next];
        afterBot[botI] = "O";
        setBoard(afterBot);
        setTurn("player");
      }, 450);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn("player");
  };

  const closeEverything = () => {
    setShowGame(false);
    setVisible(false);
    resetGame();
  };

  const dismissForGood = () => {
    setShowPrompt(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* الروبوت المطل من أسفل الصفحة */}
      <button
        className="peeking-robot"
        onClick={() => setShowPrompt(true)}
        aria-label="Play with the robot"
      >
        <svg viewBox="0 0 120 90" className="peeking-robot-svg">
          <rect x="20" y="20" width="80" height="70" rx="18" fill="#e6ecf5" />
          <circle cx="45" cy="48" r="8" fill="#2f8fff" />
          <circle cx="75" cy="48" r="8" fill="#2f8fff" />
          <rect x="42" y="65" width="36" height="5" rx="2.5" fill="#0b0b10" opacity="0.5" />
          <line x1="60" y1="20" x2="60" y2="6" stroke="#2f8fff" strokeWidth="3" />
          <circle cx="60" cy="4" r="5" fill="#2f8fff" />
        </svg>
      </button>

      {/* سؤال: طفشان؟ العب معايا */}
      {showPrompt && (
        <div className="message-modal-overlay" onClick={() => setShowPrompt(false)}>
          <div className="message-modal-card" onClick={(e) => e.stopPropagation()} style={{ textAlign: "center" }}>
            <h3>Bored? Wanna play with me? 🤖</h3>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16 }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowPrompt(false);
                  setShowGame(true);
                }}
              >
                Yes, let's play!
              </button>
              <button className="btn btn-outline" onClick={dismissForGood}>
                No thanks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* لعبة إكس أو */}
      {showGame && (
        <div className="message-modal-overlay" onClick={closeEverything}>
          <div className="message-modal-card" onClick={(e) => e.stopPropagation()} style={{ textAlign: "center" }}>
            <button className="message-modal-close" onClick={closeEverything} aria-label="close">✕</button>
            <h3>Tic-Tac-Toe — You're X 🤖 is O</h3>

            <div className="ttt-grid">
              {board.map((cell, i) => (
                <button
                  key={i}
                  className="ttt-cell"
                  onClick={() => playerMove(i)}
                  disabled={!!cell || !!winner}
                >
                  {cell}
                </button>
              ))}
            </div>

            <p style={{ minHeight: 24, marginTop: 12, color: "var(--accent)", fontWeight: 600 }}>
              {winner === "draw" && "It's a draw!"}
              {winner === "X" && "You win! 🎉"}
              {winner === "O" && "The robot wins! 🤖"}
              {!winner && (turn === "player" ? "Your turn" : "Robot's turn…")}
            </p>

            {winner && (
              <button className="btn btn-primary" onClick={resetGame} style={{ marginTop: 8 }}>
                Play again
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
