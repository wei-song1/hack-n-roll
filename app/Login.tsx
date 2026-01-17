"use client";

import React, { useState } from "react";
import CountDown from "./Countdown";

import AuthenticatorPage from "./AuthenticatorPage";
import GridCaptcha from "./GridCaptcha";
import DropoutPage from "./DropoutPage";
import LinkedInPage from "./LinkedInPage";

interface LoginProps {}

function Login(props: LoginProps) {
  const [showScreen2, setShowScreen2] = useState(false);
  const [score, setScore] = useState(0);
  const [gameIndex, setGameIndex] = useState(1); // 0 = Authenticator, 1 = Grid, 2 = Dropout, 3 = LinkedIn
  const [highScore, setHighScore] = useState(0);

  const NUM_GAMES = 4;

  const handleGameSuccess = () => {
    setScore((prev) => prev + 1);
    setGameIndex((prev) => (prev + 1) % NUM_GAMES);
  };

  const resetEverything = () => {
    setHighScore((prevHighScore) => {
      return score > prevHighScore ? score : prevHighScore;
    });

    setScore(0);
    setGameIndex(1);
    setShowScreen2(false);
  };

  const handleToggle = () => {
    setShowScreen2((prev) => {
      const next = !prev;
      if (!next) {
        // going back to login screen
        resetEverything();
      }
      return next;
    });
  };

  const handleExpire = () => {
    resetEverything();
  };

  const renderCurrentGame = () => {    
    switch (gameIndex) {
      case 0:
        return <AuthenticatorPage />;
      case 1:
        return <GridCaptcha onSuccess={handleGameSuccess} />;
      case 2:
        return <DropoutPage onSuccess={handleGameSuccess} />;
      default:
        return <LinkedInPage onSuccess={handleGameSuccess} />;
    }
  };

  return (
    <div className="w-full max-w-md p-6">
      {!showScreen2 ? (
        <>
          <h1 className="text-2xl font-bold mb-4 text-black">
            Fakeversity Of Singapore
          </h1>

          <div className="h-20" />

          <h2 className="text-black">Sign in</h2>

          <div className="h-10" />

          <form className="space-y-4">
            <div>
              <input
                id="textbox1"
                type="text"
                className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
                placeholder="FOS-ID@u.fos.edu or FOS-ID"
              />
            </div>

            <div>
              <input
                id="textbox2"
                type="password"
                className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
                placeholder="Password"
              />
            </div>

            <div className="h-3" />

            <button
              type="button"
              onClick={handleToggle}
              className="w-1/3 bg-blue-700 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Sign in
            </button>

            <label className="block text-black">
              Please sign in with your FOS-ID, e.g: <br />
              FOS-ID@u.nus.edu or FOS-ID
            </label>
            <label className="block text-black text-sm">
              Property of FOS and for authorized users only. By continuing to
              use this application which is governed by the FOS Acceptable Use
              Policy, you represent that you are an authorized user.
            </label>
            <label className="block text-blue-500">
              Change Password <br />
              Forgot Password (Student) <br />
              Forgot Password (Alumni) <br />
              Register MFA <br />
            </label>
            <label className="block text-red-500 text-sm">
              Highest authentication attempt: {highScore} <br />
            </label>
          </form>
        </>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4 text-black">
            Fakeversity Of Singapore
          </h1>

          <h1 className="text-xl mb-4 text-black">Score: {score}</h1>

          <div className="h-5" />

          <h2 className="text-black text-sm">
            This application requires a 2nd factor authentication <br />
            for security reasons.
          </h2>

          <div className="h-5" />

          {renderCurrentGame()}

          <div className="flex flex-col items-center vscreen space-y-4">
            <CountDown seconds={60} onExpire={handleExpire} />

            <button
              type="button"
              onClick={handleToggle}
              className="bg-gray-400 text-white font-semibold py-2 px-4 rounded hover:bg-gray-500 transition-colors"
            >
              Try logging in with another method
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;