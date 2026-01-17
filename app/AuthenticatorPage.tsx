"use client";

import React, { useState } from "react";
import Image from "next/image";

const AuthenticatorPage = () => {
    return (
        <div>
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

            <div className="h-10" />
        </div>
    );
};

export default AuthenticatorPage;