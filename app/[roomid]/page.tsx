"use client";
import { useState } from "react";
import GoalsSection from "./GoalSection";
import TeamSection from "./TeamSection";
import Timer from "./Timer";
import CurrentRoles from "./CurrentRole";

type Roles = {
  driver: string | undefined;
  navigator: string | undefined;
  facilitator: string | undefined;
  mob: string[] | undefined;
};

const Room = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [turnDuration, setTurnDuration] = useState<number>(420);
  const [currentRoles, setCurrentRoles] = useState<Roles>({
    driver: "Taylor",
    navigator: "Steve",
    facilitator: "Emmaneul",
    mob: ["Paul", "Peter", "Mary"],
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

  const handleAddMember = (member: string) => {
    setTeamMembers((prevMembers) => [...prevMembers, member]);
  };

  const handleToggleGoal = (index: number) => {
    // Toggle the goal's status (completed or not)
  };

  return (
    <div className="flex  gap-4 min-h-screen bg-base-300">
      <div className="w-1/2 p-4">
        <Timer
          duration={turnDuration}
          onStart={handleStart}
          onPause={handlePause}
          onReset={onReset}
          isRunning={isRunning}
        />
        <CurrentRoles
          driver={currentRoles.driver}
          navigator={currentRoles.navigator}
          facilitator={currentRoles.facilitator}
          mob={currentRoles.mob}
        />
      </div>
      <div className="w-1/2 p-4">
        <TeamSection teamMembers={teamMembers} onAddMember={handleAddMember} />
        <GoalsSection goals={goals} onToggleGoal={handleToggleGoal} />
      </div>
    </div>
  );
};

export default Room;
