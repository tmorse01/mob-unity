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
    // pusher has a dependency on next<13.4.18 as far as I can tell
    const channel = pusherClient.subscribe(`room__${roomId}`);
    channel.bind("update_room", function ({ room }: { room: RoomData }) {
      console.log("Updating room from pusher: ", room);
      setRoom(room);
    });

    return () => {
      pusherClient.disconnect();
    };
  }, []);

  const handleTimeUp = () => {
    console.log("Time up");
    rotateRoles();
  };

  const rotateRoles = () => {
    const teamMembers = [...room.teammembers];
    console.log("teamMembers: ", teamMembers);
    // Place driver into mob, make navigator driver, and pick next mob member in line for navigator
    const driverIndex = teamMembers.findIndex(
      (member) => member.role === "Driver"
    );
    const driver = teamMembers[driverIndex];
    const navigator = teamMembers.find((member) => member.role === "Navigator");
    const mob = teamMembers.filter((member) => member.role === "Mob");

    if (navigator && driver) {
      driver.role = "Mob";
      // move driver to back of the teammembers array
      teamMembers.splice(driverIndex, 1);
      teamMembers.push(driver);
      navigator.role = "Driver";
      mob[0].role = "Navigator";
    } else {
      console.error("Unable to find driver and navigator.");
    }
    // console.log("updated team members: ", teamMembers);
    updateTeamMembers(teamMembers);
    // TODO remove room set state once websockets working consistently
    setRoom({ ...room, ...{ teammembers: teamMembers } });
  };

  const updateTeamMembers = (teammembers: TeamMember[]) => {
    const body = JSON.stringify({
      action: "updateTeamMembers",
      roomid: roomId,
      teammembers,
    });
    return fetch("/api/rooms", {
      method: "POST",
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("updated teamembers: ", data);
      })
      .catch((error) => console.error(error));
  };

  const handleMemberChange = async (members: TeamMember[]) => {
    setRoom({ ...room, ...{ teammembers: members } });
  };

  return (
    <div className="grid m-4 lg:m-16 gap-4 g:gap-16 grid-cols-1 lg:grid-cols-2">
      <Timer roomId={roomId} onTimeUp={handleTimeUp} />
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
