"use client";
import { useEffect, useState } from "react";
import GoalsSection from "./GoalSection";
import TeamSection from "./TeamSection";
import Timer from "./Timer";
import CurrentRoles from "./CurrentRole";
import { Roles } from "../types";
import Footer from "../components/Footer";
import next from "next/types";

const defaultTeamMembers = [
  "Taylor",
  "Steve",
  "Emmanuel",
  "Tyler",
  "Michael",
  "Alan",
];

const initRoles = (teamMembers: string[]) => {
  const shuffledMembers = [...teamMembers].sort(() => Math.random() - 0.5);

  const newRoles: Roles = {
    driver: shuffledMembers.pop(),
    navigator: shuffledMembers.pop(),
    facilitator: shuffledMembers.pop(),
    mob: shuffledMembers,
  };
  return newRoles;
};

const Room = () => {
  const [teamMembers, setTeamMembers] = useState<string[]>(defaultTeamMembers);
  const [currentRoles, setCurrentRoles] = useState<Roles>(
    initRoles(teamMembers)
  );

  const rotateRoles = () => {
    const newRoles = { ...currentRoles };
    newRoles.driver = currentRoles.navigator;
    newRoles.navigator = currentRoles.facilitator;
    newRoles.facilitator = newRoles.mob.shift();
    if (currentRoles.driver !== undefined)
      newRoles.mob.push(currentRoles.driver);
    setCurrentRoles(newRoles);
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

  return (
    <div>
      <div className="grid gap-4 m-8">
        <div className="p-4">
          <div className="grid sm:grid-cols-1 md:grid-cols-2">
            <Timer onTimeUp={rotateRoles} />
            <CurrentRoles
              driver={currentRoles.driver}
              navigator={currentRoles.navigator}
              facilitator={currentRoles.facilitator}
              mob={currentRoles.mob}
            />
          </div>
        </div>
        <div className="p-4">
          <div className="grid sm:grid-cols-1 md:grid-cols-2">
            <TeamSection
              teamMembers={teamMembers}
              onAddMember={handleAddMember}
              onRemoveMember={handleRemoveMember}
            />
            <GoalsSection />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Room;
