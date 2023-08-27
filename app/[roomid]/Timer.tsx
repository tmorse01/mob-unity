import React, { useState, useEffect } from "react";
import TimerDurationForm from "./TimerDurationForm";

interface TimerProps {}

const Timer: React.FC<TimerProps> = ({}) => {
  const [turnDuration, setTurnDuration] = useState<number>(420);
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(turnDuration);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const onReset = () => {
    setIsRunning(false);
  };

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
    setRemainingTime(turnDuration);
    onReset();
  };

  const handleSetTurnDuration = (duration: number) => {
    setTurnDuration(duration);
    setRemainingTime(duration);
  };

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  // TODO add settings for adjusting turn duration, and notifications

  return (
    <div className="flex flex-col h-min">
      <div className="flex items-center justify-center gap-4 mt-4 h-32">
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              {/* @ts-ignore */}
              <span style={{ "--value": minutes }}></span>
            </span>
            min
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              {/* @ts-ignore */}
              <span style={{ "--value": seconds }}></span>
            </span>
            sec
          </div>
        </div>

        {!isRunning && (
          <button onClick={handleStart} className="btn btn-primary">
            Start
          </button>
        )}
        {isRunning && (
          <button onClick={handlePause} className="btn btn-secondary">
            Pause
          </button>
        )}
        <button onClick={handleReset} className="btn btn-accent">
          Reset
        </button>
      </div>
      {/* @ts-ignore */}
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => window.turn_duration.showModal()}
      >
        Edit Turn Duration
      </button>
      <dialog id="turn_duration" className="modal">
        <TimerDurationForm onDurationSubmit={handleSetTurnDuration} />
      </dialog>
    </div>
  );
};

export default Timer;
