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
    console.log("room useEffect");
    async function getRoomData(roomId: string) {
      // TODO implement smart caching with on demand revalidation
      return await fetch(process.env.NEXT_PUBLIC_URL + `/api/rooms/`, {
        method: "POST",
        body: JSON.stringify({ action: "getRoom", roomid: roomId }),
      })
        .then((res) => {
          console.log("res: ", res);
          return res.json();
        })
        .then((res) => (res.ok ? res.data : undefined))
        .catch((err) => console.log(err));
    }
    const response = getRoomData(roomId);
    console.log("room response: ", response);
    const channel = pusherClient.subscribe(`room__${roomId}`);
    channel.bind("update_room", function ({ room }: { room: RoomData }) {
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
