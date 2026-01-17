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
    "/row-1-column-1.png",
    "/row-1-column-2.png",
    "/row-1-column-3.png",
    "/row-1-column-4.png",
    "/row-2-column-1.png",
    "/row-2-column-2.png",
    "/row-2-column-3.png",
    "/row-2-column-4.png",
    "/row-3-column-1.png",
    "/row-3-column-2.png",
    "/row-3-column-3.png",
    "/row-3-column-4.png",
    "/row-4-column-1.png",
    "/row-4-column-2.png",
    "/row-4-column-3.png",
    "/row-4-column-4.png",
  ];

  const correctPattern = (selection: boolean[]) => {
    const validIndices = [0, 4, 5, 8, 9];
    return validIndices.some((index) => selection[index] === true);
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
      <label>Choose BIZ2 Bus Stop</label>

      <div className="grid grid-cols-4 gap-2">
        {images.map((src, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleClickImage(index)}
            className={`relative w-24 h-24 border-2 rounded 
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