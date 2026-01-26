"use client";

import React, { useState } from "react";
import Image from "next/image";

interface CaptchaPageProps {
  onSuccess?: () => void;
}

type CaptchaOption = {
  src: string;
  answer: string;
};

const captchas: CaptchaOption[] = [
  { src: "./cs1101s.png", answer: "cs1101s" },
  { src: "./cs1231s.png", answer: "cs1231s" },
  { src: "./cs1010s.jpg", answer: "cs1010s" },
];

const getRandomCaptcha = (): CaptchaOption => {
  const idx = Math.floor(Math.random() * captchas.length);
  return captchas[idx];
};

const CaptchaPage: React.FC<CaptchaPageProps> = ({ onSuccess }) => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<"success" | "error" | null>(null);
  const [currentCaptcha] = useState<CaptchaOption>(() => getRandomCaptcha());

  const handleSubmit = () => {
    const normalizedInput = input.trim().toLowerCase();
    const correctAnswer = currentCaptcha.answer.toLowerCase();

    if (normalizedInput === correctAnswer) {
      setResult("success");
      if (onSuccess) onSuccess();
    } else {
      setResult("error");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-4">
      <label className="w-full text-left text-black">
        Please enter the captcha.
      </label>

      <div className="w-full relative">
        <Image
          src={currentCaptcha.src}
          alt="Captcha"
          width={2818}
          height={1430}
          className="w-full h-auto"
        />
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 text-black"
        placeholder="Type the captcha"
      />

      <button
        type="button"
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>

      {result === "success" && (
        <p className="text-green-600 mt-2">Captcha correct.</p>
      )}
      {result === "error" && (
        <p className="text-red-600 mt-2">
          Incorrect captcha, please try again.
        </p>
      )}
    </div>
  );
};

export default CaptchaPage;