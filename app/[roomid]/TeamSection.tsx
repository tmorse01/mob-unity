"use client";
import { TeamMember } from "@/types/room";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface TeamSectionProps {
  roomId: string;
  teamMembers: TeamMember[];
  handleMemberChange: (members: TeamMember[]) => void;
}

const TeamSection: React.FC<TeamSectionProps> = ({
  roomId,
  teamMembers,
  handleMemberChange,
}) => {
  const [newMember, setNewMember] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  // TODO make toasts stack
  const handleAddMember = async () => {
    const member = {
      memberid: uuidv4(),
      name: newMember,
      role: "Mob",
    };
    if (newMember.trim() !== "") {
      handleMemberChange([...teamMembers, member]);
      setNewMember("");
      fetch(process.env.NEXT_PUBLIC_URL + `/api/rooms/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "addTeamMember",
          roomid: roomId,
          member: member,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setToastMessage("Successfully added team member.");
          // Clear the toast message after 5 seconds (5000 milliseconds)
          setTimeout(() => {
            setToastMessage(null);
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleRemoveMember = (member: TeamMember) => {
    const { memberid } = member;
    const indexOfMember = teamMembers.findIndex(
      (teamMember) => teamMember.memberid === memberid
    );
    const updatedMembers = teamMembers.filter((_, i) => i !== indexOfMember);
    handleMemberChange(updatedMembers);
    fetch(process.env.NEXT_PUBLIC_URL + `/api/rooms/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "deleteTeamMember",
        roomid: roomId,
        memberid: memberid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setToastMessage("Successfully deleted team member.");
        // Clear the toast message after 5 seconds (5000 milliseconds)
        setTimeout(() => {
          setToastMessage(null);
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="prose">
      <h1 className="font-semibold mb-4">Team</h1>
      <div className="flex flex-wrap gap-4 mt-2">
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
      <ul className="list-disc mb-8">
        {teamMembers.map((member, index) => (
          <li key={index} className="ml-8 mb-2">
            <div className="flex gap-4">
              {member.name}
              <button
                className="btn btn-circle btn-xs btn-outline"
                onClick={(e) => handleRemoveMember(member)}
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
      {toastMessage && (
        <div className="toast">
          <div className="alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>

            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSection;
