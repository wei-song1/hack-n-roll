import React, { useState, useEffect } from "react";

interface CountDownProps {
  seconds: number;
  onExpire?: () => void; // <-- new prop
}

const CountDown: React.FC<CountDownProps> = ({ seconds, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState<number>(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      // fire callback once when hitting 0
      if (onExpire) onExpire();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onExpire]);

  return (
    <div>
      <h1 className="text-white">
        00:0{timeLeft}
      </h1>
    </div>
  );
};

export default CountDown;