"use client";
import { useState } from "react";
import GoalsSection from "./GoalSection";
import TeamSection from "./TeamSection";
import Timer from "./Timer";

const Room = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [turnDuration, setTurnDuration] = useState<number>(420);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const onReset = () => {
    setIsRunning(false);
  };

  const handleAddMember = (member: string) => {
    setTeamMembers((prevMembers) => [...prevMembers, member]);
  };

  const handleToggleGoal = (index: number) => {
    // Toggle the goal's status (completed or not)
  };

  return (
    <div className="flex flex-col items-center gap-4 min-h-screen bg-base-300">
      <Timer
        duration={turnDuration}
        onStart={handleStart}
        onPause={handlePause}
        onReset={onReset}
        isRunning={isRunning}
      />
      <TeamSection teamMembers={teamMembers} onAddMember={handleAddMember} />
      <GoalsSection goals={goals} onToggleGoal={handleToggleGoal} />
    </div>
  );
};

export default Room;
