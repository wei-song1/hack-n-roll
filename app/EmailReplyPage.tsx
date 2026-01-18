"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

interface EmailReplyPageProps {
  onSuccess?: () => void;
}

// 3 shorter templates with FOS-themed terms
const TEMPLATES = [
  // 0 – Polite, normal
  {
    subject: "Absence from FOS lecture",
    body: `Dear Ryan,

I noticed you were absent from the last few FOS‑1101S lectures and tutorials. Regular attendance is important for your learning and for your FOS participation grade.

Please let me know if there are any issues and ensure you catch up on the material.

Regards,
Prof. Philo Tan
FOS School of Computing`,
    reply: `Dear Prof Tan,

Thank you for your email and your concern. I apologise for missing the recent FOS‑1101S lectures and tutorials. I have broken my leg, my dog ate my homework, my laptop exploded but I am able to attend class again.

If there are any specific topics you recommend I focus on first, I would appreciate your guidance.

Best regards,
Ryan`,
  },
  // 1 – More dramatic student excuse
  {
    subject: "Follow‑up on FOS tutorial attendance",
    body: `Hi Ryan,

You have missed several FOS‑2100 tutorials and labs. This will affect both your project work and your continuous FOS score.

Please reply to let me know what is happening and how you plan to catch up.

Best,
Prof. Philo Tan
FOS Computing`,
    reply: `Hi Prof Tan,

Thank you for following up. I am really sorry for my poor attendance for FOS‑2100. I have been forced to carry in group projects and hackathons recently.

I am now going through the tutorial solutions on the FOS Portal and revising the lab exercises. I will attend the next tutorial and lab and keep up with the schedule from here.

Thank you for your understanding.

Sincerely,
Ryan`,
  },
  // 2 – Absurd FOS-style email
  {
    subject: "[Action Needed] Repeated absence from FOS‑9999",
    body: `Dear Mr Tan,

Our system has detected multiple absences from FOS‑9999: Advanced Surviving Lectures. Continued absence may affect your eligibility for the Final Ultimate FOS Assessment.

Please reply to confirm that you are still enrolled, still conscious, and still in possession of a working FOS‑ID card.

Yours faithfully,
Prof. Philo Tan
FOS Department of Student Awakening`,
    reply: `Dear Prof Tan,

Thank you for the very dramatic reminder. I can confirm that I am still enrolled, still conscious most of the time, and my FOS‑ID card only fails to scan on alternate Tuesdays.

I apologise for vanishing from FOS‑9999. I have been buried under group projects, surprise quizzes, and mysterious FOS Portal announcements. I am now catching up using the lecture scrolls, tutorial scrolls, and the unofficial FOS survival notes shared by my classmates.

I will return to your lectures, tutorials, and labs, and do my best to appear awake during at least half of them.

Thank you for your patience.

Best regards,
Ryan`,
  },
];

// Split reply into "word chunks" while preserving spaces/newlines
const splitReplyIntoWords = (text: string): string[] => {
  return text.split(/(\s+)/).filter((chunk) => chunk.length > 0);
};

const EmailReplyPage: React.FC<EmailReplyPageProps> = ({ onSuccess }) => {
  // Deterministic default for SSR; randomised on client after mount
  const [templateIndex, setTemplateIndex] = useState(0);

  useEffect(() => {
    const idx = Math.floor(Math.random() * TEMPLATES.length);
    setTemplateIndex(idx);
  }, []);

  const template = TEMPLATES[templateIndex];

  const allWords = useMemo(
    () => splitReplyIntoWords(template.reply),
    [template.reply]
  );

  const [wordsRevealed, setWordsRevealed] = useState(0);
  const [finished, setFinished] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const displayedText = useMemo(
    () => allWords.slice(0, wordsRevealed).join(""),
    [allWords, wordsRevealed]
  );

  // Mark finished when all words are revealed
  useEffect(() => {
    if (wordsRevealed >= allWords.length && !finished) {
      setFinished(true);
    }
  }, [wordsRevealed, allWords.length, finished]);

  // Auto‑scroll textarea when text grows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [displayedText]);

  const advanceWords = (count: number) => {
    if (finished) return;
    setWordsRevealed((prev) => Math.min(allWords.length, prev + count));
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (finished) return;
    // faster: reveal more chunks per change
    advanceWords(4);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (finished) return;
    e.preventDefault(); // prevent manual editing
    // faster: reveal more chunks per key press
    advanceWords(3);
  };

  const handleSend = () => {
    if (!finished) return;
    onSuccess?.();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-black font-bold text-center">
        Reply to your FOS professor&apos;s email
      </h1>

      <div className="w-110 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden text-sm">
        {/* Email header */}
        <div className="bg-gray-100 border-b border-gray-200 px-4 py-2">
          <div className="text-[11px] text-gray-600">
            From:{" "}
            <span className="font-semibold text-black">
              philo.tan@u.fos.edu
            </span>
          </div>
          <div className="text-[11px] text-gray-600">
            To:{" "}
            <span className="font-semibold text-black">
              ryan.tan@u.fos.edu
            </span>
          </div>
          <div className="text-[11px] text-gray-600">
            Subject:{" "}
            <span className="font-semibold text-black">
              {template.subject}
            </span>
          </div>
        </div>

        {/* Original email */}
        <div className="px-4 py-3 border-b border-gray-200 bg-white">
          {template.body.split("\n").map((line, idx) => (
            <p key={idx} className="text-xs text-gray-700 mb-2">
              {line}
            </p>
          ))}
        </div>

        {/* Reply area */}
        <div className="px-4 py-3 bg-gray-50 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-600">
              Replying as <span className="font-semibold">Ryan</span>
            </span>
            <span className="text-[10px] text-gray-400">
              Spam your keyboard to auto‑write the reply
            </span>
          </div>

          <textarea
            ref={textareaRef}
            className="w-full h-25 border border-gray-300 rounded-md px-2 py-1 text-xs text-black bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={displayedText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Start typing your reply..."
          />

          <div className="flex justify-between items-center mt-1">
            <span className="text-[11px] text-gray-500">
              {finished
                ? "Reply complete. Ready to send."
                : "Keep typing to finish the reply..."}
            </span>
            <button
              type="button"
              onClick={handleSend}
              disabled={!finished}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                finished
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <p className="text-gray-500 text-[11px] max-w-xs text-center">
        Mash your keyboard to auto‑write an email reply before you get expelled.
      </p>
    </div>
  );
};

export default EmailReplyPage;