import { getApiUrl } from "@/lib/requesthelper";
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
  try {
    const apiUrl = getApiUrl();
    console.log("getRoomData: ", apiUrl);
    const response = await fetch(`${apiUrl}/api/rooms?roomid=${roomId}`, {
      cache: "no-store",
    });
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
  // console.log("Room page data: ", roomData);
  if (roomData === undefined) return <div>Room not found</div>;
  return <Room roomData={roomData} roomId={roomId} />;
};

export default RoomPage;
