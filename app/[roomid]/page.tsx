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
  console.log("getRoomData:", roomId);
  try {
    const requestBody = JSON.stringify({ action: "getRoom", roomid: roomId });
    const response = await fetch(process.env.NEXT_PUBLIC_URL + `/api/rooms/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: requestBody,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Response data: ", responseData);
    return responseData;
  } catch (error) {
    console.error("Error: ", error);
    throw error; // You may want to handle the error in a different way
  }
}

const RoomPage = async ({ params }: { params: { roomid: string } }) => {
  const roomId = params.roomid;
  console.log("roomId: ", roomId);
  const roomData = await getRoomData(roomId);
  console.log("roomData: ", roomData);
  // if (roomData === undefined) return <div>Room not found</div>;
  return (
    <div>
      <pre>{JSON.stringify(roomData, null, 4)}</pre>
    </div>
  );
  // return <Room roomData={roomData} roomId={roomId} />;
};

export default RoomPage;
