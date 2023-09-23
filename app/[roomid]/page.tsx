import { defaultRoom } from "@/types/room";
import Room from "./Room";

// const initRoles = (teamMembers: string[]) => {
//   const shuffledMembers = [...teamMembers].sort(() => Math.random() - 0.5);

//   const newRoles: Roles = {
//     driver: shuffledMembers.pop(),
//     navigator: shuffledMembers.pop(),
//     mob: shuffledMembers,
//   };
//   return newRoles;
// };

async function getRoomData(roomId: string) {
  // TODO implement smart caching with on demand revalidation
  const response = await fetch(process.env.NEXT_PUBLIC_URL + `/api/rooms/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "getRoom", roomid: roomId }),
    cache: "no-store",
  });
  return response.json();
}

const RoomPage = async ({ params }: { params: { roomid: string } }) => {
  // const [teamMembers, setTeamMembers] = useState<string[]>([]);
  // const [currentRoles, setCurrentRoles] = useState<Roles>(
  //   initRoles(teamMembers)
  // );
  const roomId = params.roomid;
  // const response = await getRoomData(roomId);
  // const roomData = response.data;
  // if (roomData === undefined) return <div>Room not found</div>;
  return <Room roomData={defaultRoom} roomId={roomId} />;
};

export default RoomPage;
