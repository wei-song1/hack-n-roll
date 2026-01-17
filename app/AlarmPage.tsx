"use client";

import React from "react";
import CountDown from "./CountdownNoText";

interface AlarmPageProps {
  onSuccess?: () => void;
}

const AlarmPage: React.FC<AlarmPageProps> = ({ onSuccess }) => {
  const handleSubmit = () => {
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-black font-bold text-center max-w-md">
        Stop the alarm before you wake all your neighbours.
      </h1>

      {/* Big white circle containing timer + buttons */}
      <div className="w-64 h-64 bg-black rounded-full shadow-lg flex flex-col items-center justify-center gap-6">
        {/* Centered time */}
        <div className="grid place-items-center w-full">
          <span className="font-bold text-3xl text-black">
            <CountDown seconds={3} />
          </span>
        </div>

        {/* Buttons row */}
        <div className="flex gap-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-16 h-16 bg-orange-600 text-white rounded-full hover:bg-orange-700 flex items-center justify-center text-xl font-bold"
          >
            X
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-16 h-16 bg-orange-600 text-white rounded-full hover:bg-orange-700 flex items-center justify-center text-sm font-semibold"
          >
            Snooze
          </button>
        </div>
      </div>

      <div className="h-16" />
    </div>
  );
};

export default AlarmPage;