"use client";
import React, { useState } from "react";

interface TimerDurationFormProps {
  onDurationSubmit: (duration: number) => void;
}

function TimerDurationForm({ onDurationSubmit }: TimerDurationFormProps) {
  const [duration, setDuration] = useState<number>(420);
  const onSubmit = () => {
    onDurationSubmit(duration);
  };

  return (
    <form
      method="dialog"
      onSubmit={onSubmit}
      className="modal-box flex flex-col gap-4 bg-base-200"
    >
      <div className="mb-4">
        <label htmlFor="duration" className="label">
          Turn Duration (minutes)
        </label>
        <input
          type="range"
          min={"300"}
          max={"540"}
          step={"60"}
          value={duration}
          className="range range-primary"
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </div>
      <div className="w-full flex justify-between text-xs px-2">
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
      </div>
      <div className="modal-action flex items-center justify-center">
        <button type="submit" className="btn btn-primary btn-sm">
          Submit
        </button>
        <button className="btn btn-secondary btn-sm">Close</button>
      </div>
    </form>
  );
}

export default TimerDurationForm;
