"use client"

import React, { useState } from "react";
import Image from "next/image";

function Test() {
  const [showScreen2, setShowScreen2] = useState(false);

  const handleToggle = () => {
    setShowScreen2((prev) => !prev);
  };

  return (
    <div>
        <button onClick={handleToggle}>
            {showScreen2 ? "Login" : "Cancel"}
        </button>

        {showScreen2 ? (
            // Screen 2
            <div style={{ marginTop: "16px" }}>
            <h1>Screen 2</h1>
            {/* Your Screen 2 content goes here */}
            </div>
        ) : (
            // Screen 1
            <div style={{ marginTop: "16px" }}>
            <h1>Screen 1</h1>
            {/* Your Screen 1 content goes here */}
            </div>
        )}
    </div>
  );
}

export default Test;