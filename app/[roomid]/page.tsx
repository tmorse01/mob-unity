import { defaultRoom } from "@/types/room";
import Room from "./Room";
import axios from "axios";

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
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_URL + `/api/rooms?roomid=` + roomId
    );

    if (!response.ok)
      throw new Error(`Request failed with status ${response.status}`);

    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

const RoomPage = async ({ params }: { params: { roomid: string } }) => {
  const roomId = params.roomid;
  const roomData = await getRoomData(roomId);
  console.log("roomData: ", roomData);
  if (roomData === undefined) return <div>Room not found</div>;
  return <Room roomData={roomData} roomId={roomId} />;
};

export default RoomPage;
