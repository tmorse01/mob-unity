"use client";
import React, { useState, useEffect } from "react";
import TimerDurationForm from "./TimerDurationForm";
import { Duration } from "@/types/room";
import { getApiUrl } from "@/lib/requesthelper";

interface TimerProps {
  roomId: string;
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

const Timer: React.FC<TimerProps> = ({ roomId, onTimeUp }) => {
  const [duration, setDuration] = useState<Duration>({
    turn: 420,
    break: 3600,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(duration.turn);
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
    setRemainingTime(duration.turn);
    onReset();
  };

  const handleSetTurnDuration = (duration: Duration) => {
    setDuration(duration);
    setRemainingTime(duration.turn);
    updateDuration(roomId, duration);
  };

  async function updateDuration(roomid: string, duration: Duration) {
    const body = JSON.stringify({ action: "editDuration", roomid, duration });
    return fetch("/api/rooms", {
      method: "POST",
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("udpated duration: ", data);
      })
      .catch((error) => console.error(error));
  }

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const timerClass = remainingTime < 30 ? "text-error animate-pulse" : "";

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
          Edit Durations
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
