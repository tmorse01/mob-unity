"use client";
import React, { useState } from "react";

interface TeamSectionProps {
  teamMembers: string[];
  onAddMember: (member: string) => void;
  onRemoveMember: (member: string) => void;
}

const TeamSection: React.FC<TeamSectionProps> = ({
  teamMembers,
  onAddMember,
  onRemoveMember,
}) => {
  const [newMember, setNewMember] = useState("");

  const handleAddMember = () => {
    if (newMember.trim() !== "") {
      onAddMember(newMember);
      setNewMember("");
    }
  };

  return (
    <div className="container mx-auto my-4">
      <h2 className="text-lg font-semibold mb-4">Team</h2>
      <ul className="list-disc mb-8">
        {teamMembers.map((member, index) => (
          <li key={index} className="ml-8 mb-2">
            <div className="flex gap-4">
              {member}
              <button
                className="btn btn-circle btn-xs btn-outline"
                onClick={(e) => onRemoveMember(member)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
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
