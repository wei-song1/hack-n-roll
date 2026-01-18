"use client";

import React, { useEffect, useRef, useState } from "react";

interface ShoutGamePageProps {
  onSuccess?: () => void;
}

// Tweak these for difficulty / feel
const THRESHOLD = 0.3;        // 0–1, higher = needs louder shout
const SAMPLE_INTERVAL = 100;  // ms between volume samples

const ShoutGamePage: React.FC<ShoutGamePageProps> = ({ onSuccess }) => {
  const [hasMic, setHasMic] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [volume, setVolume] = useState(0); // 0–1
  const [hasShouted, setHasShouted] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const startMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = stream;
        setHasMic(true);

        const AudioCtx =
          window.AudioContext || (window as any).webkitAudioContext;
        const audioCtx =
          audioContextRef.current ?? new AudioCtx();

        audioContextRef.current = audioCtx;

        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;

        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        analyserRef.current = analyser;
        sourceRef.current = source;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateVolume = () => {
          if (!analyserRef.current) return;

          analyserRef.current.getByteTimeDomainData(dataArray);

          // Rough RMS amplitude, normalized to 0–1
          let sumSquares = 0;
          for (let i = 0; i < dataArray.length; i++) {
            const v = dataArray[i] / 128 - 1; // center at 0
            sumSquares += v * v;
          }
          const rms = Math.sqrt(sumSquares / dataArray.length);
          setVolume(rms);

          if (rms >= THRESHOLD && !hasShouted) {
            setHasShouted(true);
            onSuccess?.();
          }

          timerRef.current = window.setTimeout(updateVolume, SAMPLE_INTERVAL);
        };

        updateVolume();
      } catch (e: any) {
        console.error(e);
        setHasMic(false);
        if (e?.name === "NotAllowedError") {
          setError("Microphone permission denied. You can use Skip instead.");
        } else {
          setError("Unable to access microphone. You can use Skip instead.");
        }
      }
    };

    if (
      typeof navigator !== "undefined" &&
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === "function"
    ) {
      startMic();
    } else {
      setHasMic(false);
      setError("Microphone access not supported in this browser.");
    }

    return () => {
      cancelled = true;

      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }

      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }
      if (analyserRef.current) {
        analyserRef.current.disconnect();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [onSuccess, hasShouted]);

  const handleSkip = () => {
    onSuccess?.();
  };

  const percentage = Math.min(100, Math.max(0, Math.round(volume * 100)));
  const thresholdPercent = Math.round(THRESHOLD * 100);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-black font-bold text-center">
        Shout to authenticate
      </h1>

      <p className="text-xs text-gray-600 text-center max-w-xs">
        Make some noise into your microphone and try to push the volume meter
        past the red line.
      </p>

      {/* Volume meter */}
      <div className="w-72">
        <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
          {/* Filled volume bar */}
          <div
            className="h-full bg-green-500 transition-all duration-100"
            style={{ width: `${percentage}%` }}
          />

          {/* Threshold marker */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-red-500"
            style={{ left: `${thresholdPercent}%` }}
          />

          {/* Text overlay */}
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-gray-800">
            {hasShouted ? "Success!" : `${percentage}%`}
          </div>
        </div>

        <div className="flex justify-between text-[10px] text-gray-500 mt-1">
          <span>Quiet</span>
          <span>{thresholdPercent}%</span>
          <span>Very loud</span>
        </div>
      </div>

      {/* Status / errors */}
      <div className="text-xs text-center min-h-[1.5rem]">
        {hasMic === false && (
          <p className="text-red-500">
            {error ?? "Microphone not available. Use Skip below."}
          </p>
        )}
        {hasMic && !hasShouted && (
          <p className="text-gray-600">
            Please shout into the microphone
          </p>
        )}
        {hasShouted && (
          <p className="text-green-600 font-semibold">
            Loud enough! Moving on…
          </p>
        )}
      </div>

      {/* Skip control */}
      <button
        type="button"
        onClick={handleSkip}
        className="text-xs text-gray-500 underline hover:text-gray-700 mt-1"
      >
        Skip (microphone not working)
      </button>
    </div>
  );
};

export default ShoutGamePage;