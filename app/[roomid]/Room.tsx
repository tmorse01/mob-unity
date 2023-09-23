"use client";
import { useEffect, useState } from "react";

import GoalsSection from "./GoalSection";
import TeamSection from "./TeamSection";
import Timer from "./Timer";
import CurrentRoles from "./CurrentRole";

import { defaultRoom, RoomData } from "@/types/room";

interface RoomProps {
  roomData: RoomData;
  roomId: string;
}

const Room = ({ roomData, roomId }: RoomProps) => {
  const [room, setRoom] = useState<RoomData>(roomData);
  console.log("room: ", room);

  const rotateRoles = () => {
    // const newRoles = { ...currentRoles };
    // newRoles.driver = currentRoles.navigator;
    // newRoles.navigator = newRoles.mob.shift();
    // if (currentRoles.driver !== undefined)
    //   newRoles.mob.push(currentRoles.driver);
    // setCurrentRoles(newRoles);
  };

  const handleAddMember = (member: string) => {
    // axios
    //   .post("/api/teams", {
    //     roomid: roomId,
    //     name: member,
    //   })
    //   .then((response) => {
    //     console.log("response: ", response);
    //     if (!response.data.ok) throw new Error(response.data.message);
    //     // setTeamMembers((prevMembers) => [...prevMembers, member]);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const handleRemoveMember = (member: string) => {
    // const indexOfMember = teamMembers.findIndex(
    //   (teamMember) => teamMember === member
    // );
    // const updatedMembers = teamMembers.filter((_, i) => i !== indexOfMember);
    // setTeamMembers(updatedMembers);
  };

  return (
    <div className="grid m-4 lg:m-16 gap-4 g:gap-16 grid-cols-1 lg:grid-cols-2">
      <Timer onTimeUp={rotateRoles} />
      <CurrentRoles teamMembers={room.teammembers} />
      <TeamSection
        teamMembers={room.teammembers}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
      />
      {/*Add notes section for shared notes between the team*/}

      <GoalsSection defaultGoals={room.goals} />
      {/*Add retro section for after all goals are complete*/}
    </div>
  );
};

export default Room;
