"use client";
import React, { useState } from "react";

interface TeamSectionProps {
  teamMembers: string[];
  onAddMember: (member: string) => void;
}

const TeamSection: React.FC<TeamSectionProps> = ({
  teamMembers,
  onAddMember,
}) => {
  const [newMember, setNewMember] = useState("");

  const handleAddMember = () => {
    if (newMember.trim() !== "") {
      onAddMember(newMember);
      setNewMember("");
    }
  };

  return (
    <div className="my-4">
      <h2 className="text-lg font-semibold">Team</h2>
      <ul className="list-disc pl-6">
        {teamMembers.map((member, index) => (
          <li key={index} className="mb-2">
            {member}
          </li>
        ))}
      </ul>
      <div className="mt-2">
        <input
          type="text"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="Add a team member"
          className="input input-bordered"
        />
        <button onClick={handleAddMember} className="btn btn-primary ml-2">
          Add Member
        </button>
      </div>
    </div>
  );
};

export default TeamSection;
