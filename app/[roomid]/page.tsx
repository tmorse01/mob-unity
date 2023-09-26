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
  return await fetch(process.env.NEXT_PUBLIC_URL + `/api/rooms/`, {
    method: "POST",
    body: JSON.stringify({ action: "getRoom", roomid: roomId }),
  })
    .then((res) => res.json())
    // .then((res) => (res.ok ? res.data : undefined))
    .catch((err) => console.log(err));
}

const RoomPage = async ({ params }: { params: { roomid: string } }) => {
  const roomId = params.roomid;
  const roomData = await getRoomData(roomId);
  console.log("roomData: ", roomData);
  if (roomData === undefined) return <div>Room not found</div>;
  return <div>{JSON.stringify(roomData, null, 4)}</div>;
  // return <Room roomData={roomData} roomId={roomId} />;
};

export default RoomPage;
