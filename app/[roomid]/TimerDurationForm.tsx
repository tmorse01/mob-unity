"use client";
import { Duration } from "@/types/room";
import React, { useState } from "react";

interface TimerDurationFormProps {
  duration: Duration;
  setDuration: React.Dispatch<React.SetStateAction<Duration>>;
  onDurationSubmit: (duration: Duration) => void;
}

function TimerDurationForm({
  duration,
  setDuration,
  onDurationSubmit,
}: TimerDurationFormProps) {
  const onSubmit = () => {
    onDurationSubmit(duration);
  };

  //  TODO add control for how long a break is
  return (
    <form
      method="dialog"
      onSubmit={onSubmit}
      className="modal-box flex flex-col gap-4 prose"
    >
      <div className="mb-4">
        <label htmlFor="duration" className="label">
          Turn Duration (minutes)
        </label>
        <input
          id="duration"
          type="range"
          min={"300"}
          max={"540"}
          step={"60"}
          value={duration.turn}
          className="range range-primary"
          onChange={(e) =>
            setDuration({ ...duration, turn: Number(e.target.value) })
          }
        />
      </div>
      <div className="w-full flex justify-between text-xs px-2">
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
      </div>
      <div className="mb-4">
        <label htmlFor="breakDuration" className="label">
          How long in between breaks? (minutes)
        </label>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) =>
            setDuration({ ...duration, break: Number(e.target.value) * 60 })
          }
          value={duration.break / 60}
        />
      </div>
      <div className="modal-action">
        <button type="submit" className="btn btn-primary btn-sm">
          Submit
        </button>
      </div>
    </form>
  );
}

export default TimerDurationForm;
