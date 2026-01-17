"use client";

import React, { useState, useEffect } from "react";

interface ElevatorPageProps {
  onSuccess?: () => void;
}

type Floor = {
  id: string;      // internal id / label on button
  display: string; // label shown on the target screen
};

const AVAILABLE_FLOORS: Floor[] = [
  { id: "B1", display: "B1" },
  { id: "L1", display: "L1" },
  { id: "L2", display: "L2" },
  { id: "L3", display: "L3" },
  { id: "L4", display: "L4" },
  { id: "L5", display: "L5" },
];

const POSSIBLE_TARGETS: Floor[] = [
  { id: "B1", display: "B1" },
  { id: "L1", display: "L1" },
  { id: "L2", display: "L2" },
  { id: "L3", display: "L3" },
  { id: "L4", display: "L4" },
  { id: "L5", display: "L5" },
];

const ElevatorPage: React.FC<ElevatorPageProps> = ({ onSuccess }) => {
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const [target, setTarget] = useState<Floor | null>(null);

  // Pick a target floor once on the client after mount
  useEffect(() => {
    const idx = Math.floor(Math.random() * POSSIBLE_TARGETS.length);
    setTarget(POSSIBLE_TARGETS[idx]);
  }, []);

  const handlePress = (floorId: string) => {
    if (!target) return; // no target yet

    if (floorId === target.id) {
      setResult("correct");
      onSuccess?.();
    } else {
      setResult("incorrect");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-black font-bold text-center">
        Get to the correct lecture theatre
      </h1>

      {/* Elevator "panel" container */}
      <div className="w-64 h-80 bg-gray-900 rounded-3xl shadow-lg flex flex-col items-center py-4 px-6 text-white">
        {/* Display screen */}
        <div className="w-full h-16 bg-black rounded-xl mb-4 flex flex-col items-center justify-center border border-gray-700">
          <span className="text-xs text-gray-400">Destination</span>
          <span className="text-xl font-bold text-green-400">
            {target ? target.display : "—"}
          </span>
        </div>

        {/* Instruction */}
        <p className="text-xs text-gray-300 mb-2 text-center">
          Press the correct floor to go to your lecture.
        </p>

        {/* Grid of floor buttons */}
        <div className="grid grid-cols-3 gap-3 mt-2">
          {AVAILABLE_FLOORS.map((floor) => (
            <button
              key={floor.id}
              type="button"
              onClick={() => handlePress(floor.id)}
              className="w-14 h-14 rounded-full bg-gray-800 border border-gray-600 
                         flex items-center justify-center text-sm font-semibold
                         hover:bg-gray-700 active:bg-gray-600"
            >
              {floor.id}
            </button>
          ))}
        </div>

        {/* Result text */}
        <div className="mt-4 h-6 flex items-center justify-center text-xs">
          {result === "correct" && (
            <span className="text-green-400">Doors opening…</span>
          )}
          {result === "incorrect" && (
            <span className="text-red-400">Wrong floor, try again.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElevatorPage;