"use client";

import React, { useState } from "react";
import Image from "next/image";

interface TinderPageProps {
  onSuccess?: () => void;
}

interface Profile {
  id: number;
  name: string;
  age: number;
  bio: string;
  job: string;
  distance: string;
  image: string; // NEW
}

const profiles: Profile[] = [
  {
    id: 1,
    name: "Ryan",
    age: 22,
    bio: "CS student who spends too much time debugging and not enough time showering.",
    job: "Fakeversity of Singapore · Computer Science",
    distance: "2 km away",
    image: "/person1.png",
  },
  {
    id: 2,
    name: "Chloe",
    age: 24,
    bio: "Part-time barista, full-time business student. Will stab you in the back for grades.",
    job: "Campus Café · Barista",
    distance: "5 km away",
    image: "/person2.png",
  },
  {
    id: 3,
    name: "Roy",
    age: 23,
    bio: "Gym, grades, and gaming. Currently mastering all three (or trying to).",
    job: "Fakeversity Sports Centre · Student",
    distance: "1 km away",
    image: "/person3.png",
  },
  {
    id: 4,
    name: "Emily",
    age: 21,
    bio: "Loves long walks to the lecture hall and short walks to the fridge.",
    job: "Fakeversity of Singapore · Business",
    distance: "3 km away",
    image: "/person4.png",
  },
  {
    id: 5,
    name: "Philemon",
    age: 56,
    bio: "Looking to feel young again.",
    job: "Fakeversity of Singapore · Professor",
    distance: "0.5 km away",
    image: "/person5.png",
  },
];

const TinderPage: React.FC<TinderPageProps> = ({ onSuccess }) => {
  const [index, setIndex] = useState(0);

  const currentProfile = profiles[index];

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % profiles.length);
  };

  const handleSwipeLeft = () => {
    goToNext();
  };

  const handleSwipeRight = () => {
    if (onSuccess) {
      onSuccess();
    }
    goToNext();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Card */}
      <div className="w-72 h-96 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col">
        {/* Image header */}
        <div className="relative h-2/3 w-full">
          <Image
            src={currentProfile.image}
            alt={`${currentProfile.name}'s photo`}
            fill
            className="object-cover"
            sizes="288px" // roughly w-72
          />
        </div>

        {/* Info */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-black text-xl font-bold">
              {currentProfile.name}, {currentProfile.age}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {currentProfile.job}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              {currentProfile.distance}
            </p>
            <p className="text-gray-700 text-sm mt-3 line-clamp-3">
              {currentProfile.bio}
            </p>
          </div>
        </div>
      </div>

      {/* “Swipe” buttons */}
      <div className="flex gap-8 mt-2">
        <button
          type="button"
          onClick={handleSwipeLeft}
          className="w-16 h-16 rounded-full border-2 border-red-500 text-red-500 text-2xl font-bold flex items-center justify-center hover:bg-red-50"
        >
          ✕
        </button>
        <button
          type="button"
          onClick={handleSwipeRight}
          className="w-16 h-16 rounded-full border-2 border-green-500 text-green-500 text-2xl font-bold flex items-center justify-center hover:bg-green-50"
        >
          ❤
        </button>
      </div>

      <p className="text-gray-500 text-xs">
        Click ✕ to swipe left, ❤ to swipe right.
      </p>
    </div>
  );
};

export default TinderPage;