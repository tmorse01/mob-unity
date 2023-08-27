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

  const handleRemoveMember = (member: string) => {
    const indexOfMember = teamMembers.findIndex(
      (teamMember) => teamMember === member
    );
    const updatedMembers = teamMembers.filter((_, i) => i !== indexOfMember);
    setTeamMembers(updatedMembers);
  };

  const handleToggleGoal = (index: number) => {
    // Toggle the goal's status (completed or not)
  };

  return (
    <div className="gap-4 min-h-screen bg-base-300">
      <div className="m-4 p-4 border-solid rounded-md border-slate-500 border-2">
        <div className="grid sm:grid-cols-1 md:grid-cols-2">
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
      </div>
      <div className="m-4 p-4 border-solid rounded-md border-slate-500 border-2">
        <div className="grid sm:grid-cols-1 md:grid-cols-2">
          <TeamSection
            teamMembers={teamMembers}
            onAddMember={handleAddMember}
            onRemoveMember={handleRemoveMember}
          />
          <GoalsSection goals={goals} onToggleGoal={handleToggleGoal} />
        </div>
      </div>
    </div>
  );
};

export default Room;
