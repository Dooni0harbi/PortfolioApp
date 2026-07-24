import { useState, useRef } from "react";

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

// Tiny on-the-fly sound effects using the Web Audio API — no audio files needed
function playTone(frequencies, durationMs = 160) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const start = ctx.currentTime + idx * (durationMs / 1000);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.2, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + durationMs / 1000);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + durationMs / 1000 + 0.05);
    });
  } catch (e) {
    // ignore if audio isn't supported/allowed
  }
}

function playWinSound() {
  playTone([523.25, 659.25, 783.99, 1046.5], 140); // ascending major arpeggio
}
function playLoseSound() {
  playTone([392, 349.23, 293.66, 261.63], 180); // descending tones
}
function playDrawSound() {
  playTone([440, 440], 200);
}

export default function PeekingRobot() {
  const [visible, setVisible] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("player"); // player = X, bot = O
  const soundPlayedRef = useRef(false);

  const winner = getWinner(board);

  if (winner && !soundPlayedRef.current) {
    soundPlayedRef.current = true;
    if (winner === "X") playWinSound();
    else if (winner === "O") playLoseSound();
    else playDrawSound();
  }

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
    soundPlayedRef.current = false;
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
      {/* Robot peeking from the left edge of the screen */}
      <button
        className="peeking-robot"
        onClick={() => setShowPrompt(true)}
        aria-label="Play with the robot"
      >
        <svg viewBox="0 0 120 90" className="peeking-robot-svg">
          {/* pointed ears */}
          <path d="M28 34 L14 4 L42 24 Z" fill="#c7d2e0" />
          <path d="M92 34 L106 4 L78 24 Z" fill="#c7d2e0" />

          {/* head */}
          <rect x="24" y="22" width="72" height="60" rx="22" fill="#e6ecf5" />

          {/* glowing eyes */}
          <circle cx="46" cy="48" r="7" fill="#2f8fff" />
          <circle cx="74" cy="48" r="7" fill="#2f8fff" />

          {/* snout */}
          <rect x="44" y="60" width="32" height="16" rx="8" fill="#c7d2e0" />
          <circle cx="60" cy="68" r="3.2" fill="#0b0b10" />
        </svg>
      </button>

      {/* prompt */}
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

      {/* tic-tac-toe game */}
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
