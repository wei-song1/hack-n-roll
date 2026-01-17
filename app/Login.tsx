"use client";

import React from "react";
import CountDown from "./Countdown";

import AuthenticatorPage from "./AuthenticatorPage";
import GridCaptcha from "./GridCaptcha";
import DropoutPage from "./DropoutPage";
import LinkedInPage from "./LinkedInPage";
import AlarmPage from "./AlarmPage";
import TinderPage from "./TinderPage";

interface LoginProps {
  showScreen2: boolean;
  onToggleScreen: () => void;
  score: number;
  highScore: number;
  gameIndex: number;
  onGameSuccess: () => void;
  onExpire: () => void;
}

function Login({
  showScreen2,
  onToggleScreen,
  score,
  highScore,
  gameIndex,
  onGameSuccess,
  onExpire,
}: LoginProps) {
  const renderCurrentGame = () => {
    switch (gameIndex) {
      case 0:
        return <AuthenticatorPage />;
      case 1:
        return <GridCaptcha onSuccess={onGameSuccess} />;
      case 2:
        return <DropoutPage onSuccess={onGameSuccess} />;
      case 3:
        return <LinkedInPage onSuccess={onGameSuccess} />;
      case 4:
        return <AlarmPage onSuccess={onGameSuccess} />;
      default:
        return <TinderPage onSuccess={onGameSuccess} />;
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
                className="w-full border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 text-black"
                placeholder="FOS-ID@u.fos.edu or FOS-ID"
              />
            </div>

            <div>
              <input
                id="textbox2"
                type="password"
                className="w-full border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 text-black"
                placeholder="Password"
              />
            </div>

            <div className="h-3" />

            <button
              type="button"
              onClick={onToggleScreen}
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
            <div className="h-20"></div>
            <label className="text-gray-400 text-sm">Made By Wei Song</label>
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
            <CountDown seconds={60} onExpire={onExpire} />

            <button
              type="button"
              onClick={onToggleScreen}
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