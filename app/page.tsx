"use client";

import Image from "next/image";
import React, { useState } from "react";
import Login from "./Login";
import Authenticator from "./Authenticator";

export default function Home() {
  const [showScreen2, setShowScreen2] = useState(false);
  const [score, setScore] = useState(0);
  const [gameIndex, setGameIndex] = useState(9); 
  // 0 = Authenticator, 1 = Grid, 2 = Dropout, 3 = LinkedIn, 4 = Alarm, 
  // 5 = Tinder, 6 = Captcha, 7 = Grid 2, 8 = Telegram, 9 = Grid Escape, 
  // 10 = Elavator, 11 = Resume Editor
  const [highScore, setHighScore] = useState(0);

  const NUM_GAMES = 12;

  const getRandomNextGameIndex = (currentIndex: number) => {
    const availableIndices = Array.from({ length: NUM_GAMES }, (_, i) => i).filter(
      (i) => i !== currentIndex
    );
    const randomIdx = Math.floor(Math.random() * availableIndices.length);
    return availableIndices[randomIdx];
  };

  const handleGameSuccess = () => {
    setScore((prev) => prev + 1);
    setGameIndex((prev) => (prev + 1) % NUM_GAMES);
    // setGameIndex((prev) => getRandomNextGameIndex(prev));
  };

  const resetEverything = () => {
    setHighScore((prevHighScore) =>
      score > prevHighScore ? score : prevHighScore
    );
    setScore(0);
    setGameIndex(1);
    setShowScreen2(false);
  };

  const handleExpire = () => {
    resetEverything();
  };

  const handleToggleScreen = () => {
    setShowScreen2((prev) => {
      const next = !prev;
      if (!next) {
        resetEverything();
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="w-70/100 bg-gray-100 flex items-center justify-center">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src="/banner.png"
            alt="Profile"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute bottom-0 left-0 m-6">
            <Authenticator
              // Only active when: game screen visible AND authenticator game index
              isActive={showScreen2 && gameIndex === 0}
              onSuccess={handleGameSuccess}
            />
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="w-30/100 bg-white flex items-center justify-center">
        <Login
          showScreen2={showScreen2}
          onToggleScreen={handleToggleScreen}
          score={score}
          highScore={highScore}
          gameIndex={gameIndex}
          onGameSuccess={handleGameSuccess}
          onExpire={handleExpire}
        />
      </div>
    </div>
  );
}