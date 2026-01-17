"use client";

import React, { useState } from "react";
import Image from "next/image";

interface GridCaptchaProps {
  onSuccess?: () => void;
}

const GridCaptcha: React.FC<GridCaptchaProps> = ({ onSuccess }) => {
  const [selected, setSelected] = useState<boolean[]>(Array(16).fill(false));
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);

  const images = [
    "/1-column-1.png",
    "/1-column-2.png",
    "/1-column-3.png",
    "/1-column-4.png",
    "/2-column-1.png",
    "/2-column-2.png",
    "/2-column-3.png",
    "/2-column-4.png",
    "/3-column-1.png",
    "/3-column-2.png",
    "/3-column-3.png",
    "/3-column-4.png",
    "/4-column-1.png",
    "/4-column-2.png",
    "/4-column-3.png",
    "/4-column-4.png",
  ];

  // Only indices 0, 4, 5, 8, 9 are allowed.
  // Any selected index outside this set → incorrect.
  const correctPattern = (selection: boolean[]) => {
    const validIndices = [3];

    // Collect all selected indices
    const selectedIndices = selection
      .map((isSelected, idx) => (isSelected ? idx : -1))
      .filter((idx) => idx !== -1);

    // Must have at least one selected
    if (selectedIndices.length === 0) return false;

    // Every selected index must be in validIndices
    return selectedIndices.every((idx) => validIndices.includes(idx));
  };

  const handleClickImage = (index: number) => {
    setSelected((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const handleSubmit = () => {
    if (correctPattern(selected)) {
      setResult("correct");
      if (onSuccess) onSuccess();
    } else {
      setResult("incorrect");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-black font-bold">Choose COM4</h1>

      <div className="grid grid-cols-4 gap-2">
        {images.map((src, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleClickImage(index)}
            className={`relative w-24 h-24 border-3 rounded 
              ${selected[index] ? "border-blue-500" : "border-gray-300"}`}
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              fill
              sizes="96px"
              className="object-cover rounded"
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>

      {result === "correct" && (
        <p className="text-green-600 mt-2">Correct selection!</p>
      )}
      {result === "incorrect" && (
        <p className="text-red-600 mt-2">Incorrect selection, try again.</p>
      )}
    </div>
  );
};

export default GridCaptcha;