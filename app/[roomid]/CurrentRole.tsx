import { TeamMember } from "@/types/room";
import React from "react";

interface CurrentRoleProps {
  teamMembers: TeamMember[];
}

const CurrentRoles: React.FC<CurrentRoleProps> = ({ teamMembers }) => {
  const driver = teamMembers.find((member) => member.role === "Driver");
  const navigator = teamMembers.find((member) => member.role === "Navigator");
  const mob = teamMembers.filter((member) => member.role === "Mob");

  return (
    <div className="prose">
      <h1 className="mb-0">Roles</h1>
      <div className="flex flex-cols gap-8 items-center w-full">
        <div>
          <h3>Driver</h3>
          <p>{driver?.name}</p>
        </div>
        <div>
          <h3>Navigator</h3>
          <p>{navigator?.name}</p>
        </div>
      </div>
      <div className="prose">
        <div className="flex flex-cols gap-4 items-center">
          <h2 className="mb-12">Mob</h2>
          <div className="flex flex-row gap-4">
            {mob?.map((mobster, i) => (
              <div key={mobster?.name + i} className="text-center">
                <p>{mobster?.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentRoles;
