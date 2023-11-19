import React, { useState, useEffect } from "react";
import TimerDurationForm from "./TimerDurationForm";

interface TimerProps {
  onTimeUp: () => void;
}

const showNotification = () => {
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      new Notification("Time is up!", {
        body: "Rotate the current roles.",
        icon: "./alert.svg",
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Time is up!", {
            body: "Rotate the current roles.",
            icon: "./alert.svg",
          });
        }
      });
    }
  }
};

const Timer: React.FC<TimerProps> = ({ onTimeUp }) => {
  const [turnDuration, setTurnDuration] = useState<number>(420);
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(turnDuration);
  const [showNotifications, setShowNotifications] = useState<boolean>(true);

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
    } else if (remainingTime === 0) {
      if (showNotifications) showNotification();
      onTimeUp();
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

  const timerClass = remainingTime < 30 ? "text-error animate-pulse" : "";
  // TODO add break duration

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-4">
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className={"countdown font-mono text-5xl"}>
              <span
                className={timerClass}
                // @ts-ignore
                style={{ "--value": minutes }}
              ></span>
            </span>
            min
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className={"countdown font-mono text-5xl"}>
              <span
                className={timerClass}
                // @ts-ignore

                style={{ "--value": seconds }}
              ></span>
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
        <button onClick={onTimeUp} className="btn btn-neutral">
          Rotate
        </button>
      </div>

      <div className="prose flex flex-wrap items-center gap-4">
        <button
          className="btn btn-secondary btn-sm"
          // @ts-ignore
          onClick={() => window.turn_duration.showModal()}
        >
          Edit Turn Duration
        </button>
        <div className="flex flex-row items-center gap-4">
          <label className="label">Show Notifications</label>
          <input
            type="checkbox"
            className="toggle toggle-info"
            checked={showNotifications}
            onChange={() => setShowNotifications(!showNotifications)}
          />
        </div>
      </div>
      <dialog id="turn_duration" className="modal">
        <TimerDurationForm onDurationSubmit={handleSetTurnDuration} />
      </dialog>
    </div>
  );
};

export default Timer;
