"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";

import GoalsSection from "./GoalSection";
import TeamSection from "./TeamSection";
import Timer from "./Timer";
import CurrentRoles from "./CurrentRole";

import { RoomData, TeamMember } from "@/types/room";

interface RoomProps {
  roomData: RoomData;
  roomId: string;
}

const Room = ({ roomData, roomId }: RoomProps) => {
  const [room, setRoom] = useState<RoomData>(roomData);
  // console.log("room: ", room);

  useEffect(() => {
    // implement inactivity timeout for connection
    const channel = pusherClient.subscribe(`room__${roomId}`);
    channel.bind("update_room", function ({ room }: { room: RoomData }) {
      console.log("updating room from pusher", room);
      setRoom(room);
    });

    return () => {
      pusherClient.disconnect();
    };
  }, []);

  const rotateRoles = () => {
    // const newRoles = { ...currentRoles };
    // newRoles.driver = currentRoles.navigator;
    // newRoles.navigator = newRoles.mob.shift();
    // if (currentRoles.driver !== undefined)
    //   newRoles.mob.push(currentRoles.driver);
    // setCurrentRoles(newRoles);
  };

  const handleMemberChange = async (members: TeamMember[]) => {
    setRoom({ ...room, ...{ teammembers: members } });
  };

  return (
    <div className="grid m-4 lg:m-16 gap-4 g:gap-16 grid-cols-1 lg:grid-cols-2">
      <Timer onTimeUp={rotateRoles} />
      <CurrentRoles teamMembers={room.teammembers} />
      <TeamSection
        roomId={roomId}
        teamMembers={room.teammembers}
        handleMemberChange={handleMemberChange}
      />
      {/*Add notes section for shared notes between the team*/}

      <GoalsSection defaultGoals={room.goals} />
      {/*Add retro section for after all goals are complete*/}
    </div>
  );
};

export default Room;
