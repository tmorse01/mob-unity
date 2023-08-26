// components/Timer.tsx
import React, { useState, useEffect } from "react";

interface TimerProps {
  duration: number;
  onStart: () => void;
  onReset: () => void;
  onPause: () => void;
  isRunning: boolean;
}

const Timer: React.FC<TimerProps> = ({
  duration,
  onStart,
  onReset,
  onPause,
  isRunning,
}) => {
  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, remainingTime]);

  const handleReset = () => {
    setRemainingTime(duration);
    onReset();
  };

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  //   const progress = ((duration - remainingTime) / duration) * 100;
  const progress = 400;
  return (
    <div className="flex items-center justify-center gap-4 mt-4 h-32">
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": minutes }}></span>
          </span>
          min
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": seconds }}></span>
          </span>
          sec
        </div>
      </div>

      {!isRunning && (
        <button onClick={onStart} className="btn btn-primary">
          Start
        </button>
      )}
      {isRunning && (
        <button onClick={onPause} className="btn btn-secondary">
          Pause
        </button>
      )}
      <button onClick={handleReset} className="btn btn-accent">
        Reset
      </button>
    </div>
  );
};

export default Timer;
