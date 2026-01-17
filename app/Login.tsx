import React, { ReactNode } from "react";

interface LoginProps {
}

function Login() {
    return (
        <div className="w-full max-w-md p-6">
                <h1 className="text-2xl font-bold mb-4 text-black">
                    Fakeversity Of Singapore
                </h1>

                <div className="h-20"> </div>

                <h2 className="text-black">
                    Sign in
                </h2>

                <div className="h-10"> </div>

                {/* ID Input */}
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
                    {/* Password Input */}
                    <input
                        id="textbox2"
                        type="text"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
                        placeholder="Password"
                    />
                </div>

                <div className="h-3"> </div>

                <button
                    type="submit"
                    className="w-1/3 bg-blue-700 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        Sign in
                </button>

                <label className="block text-black">
                    Please sign in with your FOS-ID, e.g: <br />
                    FOS-ID@u.nus.edu or FOS-ID
                </label>
                <label className="block text-black text-sm">
                    Property of FOS and for authorized users only. By continuing to use this application which is governed by the FOS Acceptable Use Policy, you represent that you are an authorized user.
                </label>
                <label className="block text-blue-500">
                    Change Password <br />
                    Forgot Password (Student) <br />
                    Forgot Password (Alumni) <br />
                    Register MFA <br />
                </label>
            </form>
        </div>
    );
}

export default Login;


