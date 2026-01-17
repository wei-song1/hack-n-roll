"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProfRatingPageProps {
  onSuccess?: () => void;
}

const ProfRatingPage: React.FC<ProfRatingPageProps> = ({ onSuccess }) => {
  const [lectureRating, setLectureRating] = useState<number | null>(null);
  const [tutorialRating, setTutorialRating] = useState<number | null>(null);
  const [labRating, setLabRating] = useState<number | null>(null);

  const allRated =
    lectureRating !== null &&
    tutorialRating !== null &&
    labRating !== null;

  const handleSubmit = () => {
    if (!allRated) return;
    onSuccess?.();
  };

  const renderStars = (
    selected: number | null,
    onSelect: (value: number) => void
  ) => (
    <div className="flex gap-2 mt-1">
      {[1, 2, 3, 4, 5].map((value) => {
        const isSelected = selected === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            className={`w-8 h-8 rounded-full text-xs font-semibold flex items-center justify-center border ${
              isSelected
                ? "bg-blue-600 text-white border-blue-700"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {value}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-black font-bold text-center">
        Rate your professor
      </h1>

      {/* Card */}
      <div className="w-80 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex flex-col gap-4">
        {/* Prof header */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-300">
            {/* Replace src with your actual prof image if you have one */}
            <Image
              src="/person5.png"
              alt="Professor"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-black">
              Prof. Philemon Tan
            </span>
            <span className="text-[11px] text-gray-500">
              Fakeversity of Singapore · Computer Science
            </span>
          </div>
        </div>

        {/* Ratings */}
        <div className="space-y-3 text-xs text-black">
          <div>
            <p className="font-semibold">Rate professor&apos;s lecture</p>
            {renderStars(lectureRating, setLectureRating)}
          </div>

          <div>
            <p className="font-semibold">Rate professor&apos;s tutorial</p>
            {renderStars(tutorialRating, setTutorialRating)}
          </div>

          <div>
            <p className="font-semibold">Rate professor&apos;s lab</p>
            {renderStars(labRating, setLabRating)}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allRated}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
              allRated
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </div>
      </div>

      <p className="text-gray-500 text-[11px]">
        You must rate lecture, tutorial, and lab to continue.
      </p>
    </div>
  );
};

export default ProfRatingPage;