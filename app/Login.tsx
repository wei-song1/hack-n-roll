"use client"

import React, { useState } from "react";

interface LoginProps {}

function Login(props: LoginProps) {
  const [showScreen2, setShowScreen2] = useState(false);

  const handleToggle = () => {
    setShowScreen2((prev) => !prev);
  };

  return (
    <div className="w-full max-w-md p-6">
      {!showScreen2 ? (
        /* ---------- SCREEN 1: LOGIN FORM ---------- */
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

            {/* SIGN IN -> GO TO SCREEN 2 */}
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
          </form>
        </>
      ) : (
        /* ---------- SCREEN 2: AFTER SIGN IN ---------- */
        <div>
            <h1 className="text-2xl font-bold mb-4 text-black">
                Fakeversity Of Singapore
            </h1>

            <div className="h-20" />

            <h2 className="text-black text-sm">
                This application requires a 2nd factor authentication <br/>
                for security reasons.
            </h2>

            <div className="h-5" />

            <h2 className="text-black text-sm">
                Open your Marohard Authenticator app and tap the <br/>
                number you see below to sign in.
            </h2>

            <div className="h-10" />

            <div className="flex justify-center">
                {/* Placeholder text */}
                <h2 className="text-black text-2xl">
                67
                </h2>
            </div>

          {/* CANCEL -> BACK TO SCREEN 1 */}
          <button
            type="button"
            onClick={handleToggle}
            className="bg-gray-400 text-white font-semibold py-2 px-4 rounded hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;