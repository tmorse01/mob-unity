"use client";
import { useState } from "react";
import GoalsSection from "./GoalSection";
import TeamSection from "./TeamSection";
import Timer from "./Timer";
import CurrentRoles from "./CurrentRole";
import { Roles } from "../types";
import Footer from "../components/Footer";

const Room = () => {
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [currentRoles, setCurrentRoles] = useState<Roles>({
    driver: "Taylor",
    navigator: "Steve",
    facilitator: "Emmaneul",
    mob: ["Paul", "Peter", "Mary"],
  });

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
            <Timer />
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
