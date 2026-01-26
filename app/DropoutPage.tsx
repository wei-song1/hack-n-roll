"use client";

import React, { useState } from "react";
import Image from "next/image";

interface DropoutPageProps {
  onSuccess?: () => void;
}

const DropoutPage: React.FC<DropoutPageProps> = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [result, setResult] = useState<"success" | "error" | null>(null);

  const handleSubmit = () => {
    if (name.trim().length > 0) {
      setResult("success");
      if (onSuccess) onSuccess();
    } else {
      setResult("error");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-4">
      <label className="w-full text-left text-black">
        Sign your name below.
      </label>

      <div className="w-full relative">
        <Image
          src="./dropoutForm.png"
          alt="Dropout form"
          width={2818}
          height={1430}
          className="w-full h-auto"
        />
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 text-black"
        placeholder="Type your name"
      />

      <button
        type="button"
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>

      {result === "success" && (
        <p className="text-green-600 mt-2">Signature accepted.</p>
      )}
      {result === "error" && (
        <p className="text-red-600 mt-2">Error: field is empty.</p>
      )}
    </div>
  );
};

export default DropoutPage;
