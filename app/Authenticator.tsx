"use client";

import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import Image from "next/image";

interface AuthenticatorProps {
  isActive: boolean;       // true only when AuthenticatorPage is the current game
  onSuccess: () => void;   // called when middle button is clicked
}

function Authenticator({ isActive, onSuccess }: AuthenticatorProps) {
  const [showPopUp, setShowPopUp] = useState(false);

  const handleClosePopup = () => {
    setShowPopUp(false);
  };

  const handleMiddleButtonClick = () => {
    onSuccess(); 
    setShowPopUp(false);
  };

  const handleWrongButtonClick = () => {
    setShowPopUp(false);
  };

  return (
    <div>
      {/* Popup with 3 buttons – only visible when isActive === true */}
      <Popup showPopUp={showPopUp && isActive} closePopUp={handleClosePopup}>
        <div className="w-90 h-160 bg-white rounded-lg shadow-lg">
          <div className="w-90 h-14 bg-blue-500 rounded-t-lg flex items-center justify-center">
            <Image
              className="dark:invert"
              src="./hamburger-svgrepo-com.svg"
              alt="Menu"
              width={24}
              height={24}
            />
            <div className="w-5" />
            <label className="block text-center font-bold text-2xl text-white">
              Authenticator
            </label>
            <div className="w-5" />
            <Image
              className="dark:invert"
              src="./magnifying-glass-backup-svgrepo-com.svg"
              alt="Search"
              width={28}
              height={28}
            />
            <div className="w-5" />
            <Image
              className="dark:invert"
              src="./plus-large-svgrepo-com.svg"
              alt="Add"
              width={28}
              height={28}
            />
          </div>

          <div className="p-4 flex flex-col items-center gap-3">
            <p className="text-black text-sm mb-2">
              Tap the correct number to approve sign-in.
            </p>

            <div className="flex gap-3">
              <button
                className="px-4 py-2 bg-blue-600 rounded hover:bg-gray-300"
                onClick={handleWrongButtonClick}
              >
                42
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleMiddleButtonClick}
              >
                67
              </button>
              <button
                className="px-4 py-2 bg-blue-600 rounded hover:bg-gray-300"
                onClick={handleWrongButtonClick}
              >
                91
              </button>
            </div>
          </div>
        </div>
      </Popup>

      <div className="h-5" />

      {/* App icon – can only open popup when authenticator game is active */}
      <button
        onClick={() => {
          if (isActive) {
            setShowPopUp((prev) => !prev);
          }
        }}
      >
        <Image
          src="./AppIcon@2x.png"
          alt="Authenticator app icon"
          width={84}
          height={84}
          className="rounded-3xl"
        />
      </button>
    </div>
  );
}

export default Authenticator;