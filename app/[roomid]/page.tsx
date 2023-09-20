"use client";
import { useEffect, useState } from "react";
import GoalsSection from "./GoalSection";
import TeamSection from "./TeamSection";
import Timer from "./Timer";
import CurrentRoles from "./CurrentRole";
import { Roles } from "../types";
import Footer from "../components/Footer";
import axios from "axios";
import { useParams } from "next/navigation";

interface TeamMember {
  name: string;
  roomid: string;
  _id: string;
}

const initRoles = (teamMembers: string[]) => {
  const shuffledMembers = [...teamMembers].sort(() => Math.random() - 0.5);

  const newRoles: Roles = {
    driver: shuffledMembers.pop(),
    navigator: shuffledMembers.pop(),
    mob: shuffledMembers,
  };
  return newRoles;
};

const Room = () => {
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [currentRoles, setCurrentRoles] = useState<Roles>(
    initRoles(teamMembers)
  );

  const params = useParams();
  const roomId = params.roomid;

  useEffect(() => {
    // get initial team members from roomid
    axios
      .get("/api/teams", {
        params: {
          roomid: roomId,
        },
      })
      .then((response) => {
        const teamMembers = response.data.teammembers.map(
          (member: TeamMember) => member.name
        );
        setTeamMembers(teamMembers);
        setCurrentRoles(initRoles(teamMembers));
      });
  }, []);

  const rotateRoles = () => {
    const newRoles = { ...currentRoles };
    newRoles.driver = currentRoles.navigator;
    newRoles.navigator = newRoles.mob.shift();
    if (currentRoles.driver !== undefined)
      newRoles.mob.push(currentRoles.driver);
    setCurrentRoles(newRoles);
  };

  const handleAddMember = (member: string) => {
    axios
      .post("/api/teams", {
        roomid: roomId,
        name: member,
      })
      .then((response) => {
        console.log("response: ", response);
        if (!response.data.ok) throw new Error(response.data.message);
        setTeamMembers((prevMembers) => [...prevMembers, member]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveMember = (member: string) => {
    const indexOfMember = teamMembers.findIndex(
      (teamMember) => teamMember === member
    );
    const updatedMembers = teamMembers.filter((_, i) => i !== indexOfMember);
    setTeamMembers(updatedMembers);
  };

  return (
    <div className="grid m-4 lg:m-16 gap-4 g:gap-16 grid-cols-1 lg:grid-cols-2">
      <Timer onTimeUp={rotateRoles} />
      <CurrentRoles
        driver={currentRoles.driver}
        navigator={currentRoles.navigator}
        mob={currentRoles.mob}
      />
      <TeamSection
        teamMembers={teamMembers}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
      />
      {/*Add notes section for shared notes between the team*/}

      <GoalsSection />
      {/*Add retro section for after all goals are complete*/}
      <Footer />
    </div>
  );
};

export default Room;
