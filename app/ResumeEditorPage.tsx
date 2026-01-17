"use client";

import React, { useState, useRef, UIEvent } from "react";

interface ResumeEditorPageProps {
  onSuccess?: () => void;
}

const ResumeEditorPage: React.FC<ResumeEditorPageProps> = ({ onSuccess }) => {
  const [canSave, setCanSave] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4; // small tolerance
    if (isAtBottom && !canSave) {
      setCanSave(true);
    }
  };

  const handleSave = () => {
    if (!canSave) return;
    onSuccess?.();
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h1 className="text-black font-bold text-center">
        Review your resume before saving
      </h1>

      {/* Resume editor "window" */}
      <div className="w-80 h-120 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-3 justify-between">
          <span className="text-xs font-semibold text-gray-700">
            Fakeversity Resume Builder
          </span>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="w-2 h-2 rounded-full bg-green-400" />
          </div>
        </div>

        {/* Scrollable content */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-gray-50"
        >
          {/* Basic Info */}
          <section>
            <h2 className="text-sm font-semibold text-gray-800 mb-2">
              Basic Information
            </h2>
            <div className="flex flex-col gap-2 text-xs">
              <label className="flex flex-col gap-1 text-gray-700">
                Full Name
                <input
                  className="border border-gray-300 rounded px-2 py-1 text-xs text-black bg-white"
                  defaultValue="John Smith"
                />
              </label>
              <label className="flex flex-col gap-1 text-gray-700">
                Email
                <input
                  className="border border-gray-300 rounded px-2 py-1 text-xs text-black bg-white"
                  defaultValue="john.smith@u.fakeversity.edu"
                />
              </label>
              <label className="flex flex-col gap-1 text-gray-700">
                Phone
                <input
                  className="border border-gray-300 rounded px-2 py-1 text-xs text-black bg-white"
                  defaultValue="+65 9123 4567"
                />
              </label>
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-sm font-semibold text-gray-800 mb-2">
              Education
            </h2>
            <div className="border border-gray-200 rounded-md bg-white p-2 text-xs text-gray-800 space-y-1">
              <div className="font-semibold">
                Fakeversity of Singapore, School of Computing
              </div>
              <div>Bachelor of Computing in Computer Science</div>
              <div className="text-gray-500 text-[11px]">Aug 2023 – Present</div>
              <div className="text-gray-600 text-[11px]">
                Relevant modules: CS1101S, CS1231S, CS2030S, CS2040S, CS2100
              </div>
            </div>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-sm font-semibold text-gray-800 mb-2">
              Experience
            </h2>
            <div className="border border-gray-200 rounded-md bg-white p-2 text-xs text-gray-800 space-y-1">
              <div className="font-semibold">Hack & Roll 2026 – Participant</div>
              <div className="text-gray-500 text-[11px]">
                Jan 2025 · 24‑hour hackathon
              </div>
              <ul className="list-disc list-inside text-[11px] text-gray-700 space-y-1 mt-1">
                <li>
                  Built a terrible authenication simulator with multiple fake logins
                  and 2FA themed mini‑games.
                </li>
                <li>
                  Implemented React components with stateful logic, countdown
                  timers, and randomised puzzles.
                </li>
                <li>
                  Integrated playful UI elements to encourage user engagement.
                </li>
              </ul>
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-sm font-semibold text-gray-800 mb-2">
              Skills
            </h2>
            <div className="border border-gray-200 rounded-md bg-white p-2 text-xs text-gray-800 space-y-1">
              <div>
                <span className="font-semibold">Languages: </span>
                TypeScript, JavaScript, React
              </div>
              <div>
                <span className="font-semibold">Frameworks: </span>
                React, Next.js, Tailwind, CSS
              </div>
              <div>
                <span className="font-semibold">Other: </span>
                GitHub, Copilot
              </div>
            </div>
          </section>

          {/* Extra content to enforce scrolling */}
          <section>
            <h2 className="text-sm font-semibold text-gray-800 mb-2">
              Projects
            </h2>
            <div className="border border-gray-200 rounded-md bg-white p-2 text-xs text-gray-800 space-y-1">
              <div className="font-semibold">“FOS ConfessIt” Telegram Bot</div>
              <div className="text-gray-500 text-[11px]">
                Anonymous confession bot for Fakeversity students.
              </div>
              <ul className="list-disc list-inside text-[11px] text-gray-700 space-y-1 mt-1">
                <li>
                  Wrote a bunch of fake confessions
                </li>
                <li>
                  Deployed on a non existent serverless platform with simple
                  logging.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-gray-800 mb-2">
              Additional Information
            </h2>
            <p className="text-[11px] text-gray-700">
              Please scroll all the way down to confirm that you have read
              through this resume. Only then will the “Save Resume” button be
              enabled.
            </p>
          </section>

          {/* Spacer so there's actually content below fold */}
          <div className="h-8" />
        </div>

        {/* Footer with Save button (outside scroll area) */}
        <div className="h-12 border-t border-gray-200 bg-white flex items-center justify-end px-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className={`px-4 py-1.5 rounded text-xs font-semibold ${
              canSave
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Save Resume
          </button>
        </div>
      </div>

      <p className="text-gray-500 text-xs">
        Scroll to the bottom of the resume to enable the Save button.
      </p>
    </div>
  );
};

export default ResumeEditorPage;