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
  return axios
    .post(process.env.NEXT_PUBLIC_URL + `/api/rooms/`, {
      action: "getRoom",
      roomid: roomId,
    })
    .then((response) => {
      console.log("Response: ", response.data);
      return response.data.data;
    })
    .catch((error) => {
      console.log(error);
      return defaultRoom;
    });

  // return fetch(process.env.NEXT_PUBLIC_URL + `/api/rooms/`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ action: "getRoom", roomid: roomId }),
  // })
}

const RoomPage = async ({ params }: { params: { roomid: string } }) => {
  const roomId = params.roomid;
  const roomData = await getRoomData(roomId);
  if (roomData === undefined) return <div>Room not found</div>;
  return <Room roomData={roomData} roomId={roomId} />;
};

export default RoomPage;
