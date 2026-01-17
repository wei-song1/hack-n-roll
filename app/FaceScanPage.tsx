"use client";

import React, { useEffect, useRef, useState } from "react";

interface FaceScanPageProps {
  onSuccess?: () => void;
}

const REQUIRED_SECONDS = 3;

const FaceScanPage: React.FC<FaceScanPageProps> = ({ onSuccess }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(REQUIRED_SECONDS);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let cancelled = false;

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        if (cancelled) {
          mediaStream.getTracks().forEach((track) => track.stop());
          return;
        }

        stream = mediaStream;
        setHasCamera(true);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          await videoRef.current.play();
        }
      } catch (e: any) {
        if (e?.name === "AbortError") {
          setHasCamera(false);
          setError("Camera access was aborted.");
          return;
        }

        setHasCamera(false);
        setError("Unable to access camera. You can use Skip instead.");
      }
    };

    if (typeof navigator !== "undefined" && navigator.mediaDevices) {
      startCamera();
    } else {
      setHasCamera(false);
      setError("Camera access not supported in this browser.");
    }

    return () => {
      cancelled = true;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Handle scanning countdown and auto-complete
  useEffect(() => {
    if (!isScanning) return;
    if (timeLeft <= 0) {
      setIsScanning(false);
      onSuccess?.();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isScanning, timeLeft, onSuccess]);

  const handleStartScan = () => {
    if (!hasCamera) return;
    setTimeLeft(REQUIRED_SECONDS);
    setIsScanning(true);
  };

  const handleSkip = () => {
    onSuccess?.();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-black font-bold text-center">
        Face verification required
      </h1>

      <p className="text-xs text-gray-600 text-center max-w-xs">
        Position your face so your eyes and mouth are visible in the frame.
        Hold still and look at the camera for {REQUIRED_SECONDS} seconds to continue.
      </p>

      {/* Camera frame */}
      <div className="w-72 h-56 bg-black rounded-2xl relative overflow-hidden flex items-center justify-center">
        {hasCamera !== false ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-300 px-4 text-center">
            {error ?? "Camera not available."}
          </div>
        )}

        {/* Overlay frame */}
        <div className="pointer-events-none absolute inset-4 border-2 border-green-400 rounded-xl" />

        {/* Dark overlay + countdown when scanning */}
        {isScanning && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1">
            <span className="text-sm text-gray-200">Scanning…</span>
            <span className="text-3xl font-bold text-green-400">
              {timeLeft}
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-2 mt-2">
        <button
          type="button"
          onClick={handleStartScan}
          disabled={hasCamera === false}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            hasCamera === false
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isScanning ? "Restart Scan" : "Start Scan"}
        </button>

        <button
          type="button"
          onClick={handleSkip}
          className="text-xs text-gray-500 underline hover:text-gray-700 mt-1"
        >
          Skip (camera not working)
        </button>
      </div>
    </div>
  );
};

export default FaceScanPage;