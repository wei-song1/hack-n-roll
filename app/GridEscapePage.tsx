"use client";

import React, { useState, useEffect } from "react";

interface GridEscapePageProps {
  onSuccess?: () => void;
}

const GRID_SIZE = 5;

type Position = {
  row: number;
  col: number;
};

const getRandomPosition = (): Position => ({
  row: Math.floor(Math.random() * GRID_SIZE),
  col: Math.floor(Math.random() * GRID_SIZE),
});

// Exit must be on an edge cell
const getRandomEdgePosition = (): Position => {
  const edge = Math.floor(Math.random() * 4); // 0: top, 1: bottom, 2: left, 3: right
  const i = Math.floor(Math.random() * GRID_SIZE);

  switch (edge) {
    case 0: // top row
      return { row: 0, col: i };
    case 1: // bottom row
      return { row: GRID_SIZE - 1, col: i };
    case 2: // left column
      return { row: i, col: 0 };
    case 3: // right column
    default:
      return { row: i, col: GRID_SIZE - 1 };
  }
};

const getRandomPlayerAndExit = (): { player: Position; exit: Position } => {
  let player = getRandomPosition();
  let exit = getRandomEdgePosition();

  // Ensure they are not the same cell
  while (player.row === exit.row && player.col === exit.col) {
    player = getRandomPosition();
    exit = getRandomEdgePosition();
  }

  return { player, exit };
};

const GridEscapePage: React.FC<GridEscapePageProps> = ({ onSuccess }) => {
  const [{ player, exit }, setState] = useState(() => getRandomPlayerAndExit());
  const [reachedExit, setReachedExit] = useState(false);

  const movePlayer = (dRow: number, dCol: number) => {
    setState((prev) => {
      const newRow = Math.min(
        GRID_SIZE - 1,
        Math.max(0, prev.player.row + dRow)
      );
      const newCol = Math.min(
        GRID_SIZE - 1,
        Math.max(0, prev.player.col + dCol)
      );

      const newPlayer = { row: newRow, col: newCol };

      if (newPlayer.row === prev.exit.row && newPlayer.col === prev.exit.col) {
        setReachedExit(true);
      }

      return { ...prev, player: newPlayer };
    });
  };

  useEffect(() => {
    if (!reachedExit) return;

    if (onSuccess) {
      onSuccess();
    }

    const next = getRandomPlayerAndExit();
    setState(next);
    setReachedExit(false);
  }, [reachedExit, onSuccess]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-black font-bold text-center">
        Escape the classroom to get to the canteen!
      </h1>

      {/* 5x5 grid */}
      <div className="grid grid-cols-5 gap-1">
        {Array.from({ length: GRID_SIZE }).map((_, r) =>
          Array.from({ length: GRID_SIZE }).map((__, c) => {
            const isPlayer = r === player.row && c === player.col;
            const isExit = r === exit.row && c === exit.col;

            let content: React.ReactNode = null;
            if (isPlayer) content = "🧑‍🎓";
            else if (isExit) content = "🚪";

            return (
              <div
                key={`${r}-${c}`}
                className="w-10 h-10 border border-gray-300 flex items-center justify-center text-xl"
              >
                {content}
              </div>
            );
          })
        )}
      </div>

      {/* Directional pad */}
      <div className="flex flex-col items-center gap-1 mt-2">
        <button
          type="button"
          onClick={() => movePlayer(-1, 0)}
          className="w-10 h-10 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-black"
        >
          ↑
        </button>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => movePlayer(0, -1)}
            className="w-10 h-10 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-black"
          >
            ←
          </button>
          <div className="w-10 h-10" />
          <button
            type="button"
            onClick={() => movePlayer(0, 1)}
            className="w-10 h-10 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-black"
          >
            →
          </button>
        </div>
        <button
          type="button"
          onClick={() => movePlayer(1, 0)}
          className="w-10 h-10 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-black"
        >
          ↓
        </button>
      </div>
    </div>
  );
};

export default GridEscapePage;