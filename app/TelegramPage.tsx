"use client";

import React, { useState } from "react";

interface TelegramPageProps {
  onSuccess?: () => void;
}

const TelegramPage: React.FC<TelegramPageProps> = ({ onSuccess }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) {
      // Empty or only spaces: do nothing
      return;
    }

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Text before the page */}
      <h1 className="text-black font-bold text-center">
        Type your latest confession
      </h1>

      {/* Centered "Telegram" page */}
      <div className="w-72 h-124 bg-[#17212b] rounded-2xl shadow-lg flex flex-col overflow-hidden text-white">
        {/* Header */}
        <div className="h-12 bg-[#17212b] border-b border-[#1f2933] flex items-center px-3 gap-2">
          <div className="w-8 h-8 rounded-full bg-[#2b5278] flex items-center justify-center text-xs font-semibold">
            F
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">FOS ConfessIt 📢</span>
            <span className="text-[10px] text-gray-400">10,234 members</span>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 bg-[#0e1621] px-3 py-2 overflow-y-auto space-y-2 text-sm">
          <div className="flex flex-col items-start">
            <div className="text-[10px] text-gray-400 mb-1">Anonymous</div>
            <div className="max-w-[80%] bg-[#182533] rounded-2xl rounded-tl-none px-3 py-2">
              I once submitted a hackathon made from ChatGPT and won first prize.
            </div>
          </div>

          <div className="flex flex-col items-start">
            <div className="text-[10px] text-gray-400 mb-1">Anonymous</div>
            <div className="max-w-[80%] bg-[#182533] rounded-2xl rounded-tl-none px-3 py-2">
              did you guys see the police outside??
            </div>
          </div>

          <div className="flex flex-col items-start">
            <div className="text-[10px] text-gray-400 mb-1">Anonymous</div>
            <div className="max-w-[80%] bg-[#182533] rounded-2xl rounded-tl-none px-3 py-2">
              looking for a gf, open to anything
            </div>
          </div>

          <div className="flex flex-col items-start">
            <div className="text-[10px] text-gray-400 mb-1">Anonymous</div>
            <div className="max-w-[80%] bg-[#182533] rounded-2xl rounded-tl-none px-3 py-2">
              looking for cs4222 teammates, hmu we have 2 graduate students looking for 2 more
            </div>
          </div>

          <div className="flex flex-col items-start">
            <div className="text-[10px] text-gray-400 mb-1">Anonymous</div>
            <div className="max-w-[80%] bg-[#182533] rounded-2xl rounded-tl-none px-3 py-2">
              serious question, how does anyone pass cs1234???? the prof is bad at teaching
            </div>
          </div>

          <div className="flex flex-col items-start">
            <div className="text-[10px] text-gray-400 mb-1">Anonymous</div>
            <div className="max-w-[80%] bg-[#182533] rounded-2xl rounded-tl-none px-3 py-2">
              Henry {'>>>'} gff
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="h-12 bg-[#17212b] border-t border-[#1f2933] flex items-center px-2 gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a confession…"
            className="flex-1 bg-[#0e1621] text-xs text-white px-3 py-2 rounded-full border border-[#1f2933] focus:outline-none focus:ring-1 focus:ring-[#2b5278]"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="px-3 py-1.5 bg-[#2b5278] rounded-full text-xs font-semibold hover:bg-[#316190]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelegramPage;