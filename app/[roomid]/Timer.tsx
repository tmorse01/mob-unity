"use client";
import React, { useState, useEffect } from "react";
import TimerDurationForm from "./TimerDurationForm";
import { Duration } from "@/types/room";
import Countdown from "./Countdown";

interface TimerProps {
  roomId: string;
  handleRotateRoles: () => void;
  onTimeUp: () => void;
}

type CurrentBreak = {
  active: boolean;
  remainingTime: number;
};

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

const Timer: React.FC<TimerProps> = ({
  roomId,
  handleRotateRoles,
  onTimeUp,
}) => {
  const [duration, setDuration] = useState<Duration>({
    turn: 5,
    break: 6,
    session: 0,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(duration.turn);
  const [showNotifications, setShowNotifications] = useState<boolean>(true);
  const [currentBreak, setCurrentBreak] = useState<CurrentBreak>({
    active: false,
    remainingTime: 600,
  });

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
    if (isRunning) {
      timer = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime((prevTime) => prevTime - 1);
        } else {
          clearInterval(timer);
        }
      }, 1000);
    } else if (remainingTime === 0) {
      if (showNotifications) showNotification();
      // another turn completed add it to the session total duration
      const updatedDuration = {
        ...duration,
        session: duration.session + duration.turn,
      };
      setDuration(updatedDuration);
      updateDuration(roomId, updatedDuration);
      setIsRunning(false);
      setRemainingTime(duration.turn);
      onTimeUp();
      // check if it's time to take a break
      if (updatedDuration.session >= updatedDuration.break) {
        setCurrentBreak({
          ...currentBreak,
          active: true,
          remainingTime: duration.break,
        });
      }
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    let breakTimer: NodeJS.Timeout;
    if (currentBreak.active) {
      breakTimer = setInterval(() => {
        if (currentBreak.remainingTime > 0) {
          setCurrentBreak((prevBreak) => ({
            ...prevBreak,
            remainingTime: prevBreak.remainingTime - 1,
          }));
        } else {
          clearInterval(breakTimer);
        }
      }, 1000);
    }
    return () => clearInterval(breakTimer);
  }, [currentBreak]);

  const handleReset = () => {
    setRemainingTime(duration.turn);
    onReset();
  };

  const handleResumeSession = () => {
    setCurrentBreak({ ...currentBreak, active: false });
    setDuration({ ...duration, session: 0 });
  };

  const handleSetTurnDuration = (duration: Duration) => {
    setRemainingTime(duration.turn);
    updateDuration(roomId, duration);
  };

  async function updateDuration(roomid: string, duration: Duration) {
    // console.log("updateDuration: ", duration);
    const body = JSON.stringify({ action: "editDuration", roomid, duration });
    return fetch("/api/rooms", {
      method: "POST",
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("updated duration: ", data);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="flex flex-col gap-8">
      {!currentBreak.active && (
        <div className="flex flex-wrap items-center gap-4">
          <Countdown remainingTime={remainingTime} />

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
          <button onClick={handleRotateRoles} className="btn btn-neutral">
            Rotate
          </button>
        </div>
      )}
      {currentBreak.active && (
        <div className="prose">
          <h1>Time to take a break!</h1>
          <div className="flex flex-wrap items-center gap-4">
            <Countdown remainingTime={currentBreak.remainingTime} />
            <button className="btn btn-primary" onClick={handleResumeSession}>
              Resume
            </button>
          </div>
        </div>
      )}

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
        <TimerDurationForm
          duration={duration}
          setDuration={setDuration}
          onDurationSubmit={handleSetTurnDuration}
        />
      </dialog>
    </div>
  );
};

export default Timer;
