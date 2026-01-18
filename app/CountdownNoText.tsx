"use client";

import React, { useState, useEffect, useRef } from "react";

interface CountDownProps {
  seconds: number;
  onExpire?: () => void;
}

const CountDown: React.FC<CountDownProps> = ({ seconds, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState<number>(seconds);
  const alarmRef = useRef<HTMLAudioElement | null>(null);
  const hasExpiredRef = useRef(false);

  useEffect(() => {
    // Create audio element once
    if (!alarmRef.current) {
      const audio = new Audio("/alarm.m4a"); // put your custom sound path here
      audio.loop = true; // infinite loop
      alarmRef.current = audio;
    }

    return () => {
      // Stop and clean up when component unmounts
      if (alarmRef.current) {
        alarmRef.current.pause();
        alarmRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!hasExpiredRef.current) {
        hasExpiredRef.current = true;

        // Fire callback once
        if (onExpire) onExpire();

        // Start looping alarm
        if (alarmRef.current) {
          alarmRef.current
            .play()
            .catch(() => {
              // autoplay may fail without user gesture; ignore
            });
        }
      }
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onExpire]);

  // Simple mm:ss format for small values (you can enhance if needed)
  return (
    <div>
      <h1 className="text-white">
        00:{timeLeft.toString().padStart(2, "0")}
      </h1>
    </div>
  );
};

export default CountDown;