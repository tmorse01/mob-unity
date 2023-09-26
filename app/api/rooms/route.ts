import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { pusherServer } from "@/lib/pusher";

import clientPromise from "@/lib/mongodb";
import { AddTeamRequestBody, DeleteTeamRequestBody } from "@/types/room";

export async function GET() {
  const greeting = "Hello from rooms api";
  const json = {
    greeting,
  };

  return NextResponse.json(json);
}

export async function POST(request: Request) {
  // make an update to the room
  // case per action like
  // addRoom, getRoom
  // addTeamMember, deleteTeamMember
  // addGoal, updateGoal, deleteGoal
  // startTimer, stopTimer, timerReset, durationChange
  // rotateRoles
  // console.log("env stuff", { env: process.env });
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Sample Post",
      body: "This is the body of the sample post.",
      userId: 1,
    }),
  });

  const data = await res.json();

  return NextResponse.json(data);

  // const body = await request.json();
  // console.log("POST", body);
  // const client = await clientPromise;
  // var response;
  // response = NextResponse.json({
  //   ok: false,
  //   message: "Invalid action",
  //   status: 500,
  // });

  // if (body.action === "addRoom") {
  //   response = await addRoom(client, body);
  // } else if (body.action === "getRoom") {
  //   response = await getRoom(client, body);
  // } else if (body.action === "addTeamMember") {
  //   response = await addTeamMember(client, body);
  // } else if (body.action === "deleteTeamMember") {
  //   response = await deleteTeamMember(client, body);
  // } else {
  //   response = NextResponse.json({
  //     ok: false,
  //     message: "Invalid action",
  //     status: 500,
  //   });
  // }
  // const getUpdatedRoomResponse = await getRoom(client, body);
  // const updatedRoomData = await getUpdatedRoomResponse.json();
  // pusherServer.trigger(`room__${body.roomid}`, "update_room", {
  //   room: updatedRoomData.data,
  // });
  // if (getUpdatedRoomResponse.ok === false) {
  //   return getUpdatedRoomResponse;
  // }

  // return response;
}

async function getRoom(client: MongoClient, body: { roomid: string }) {
  // const { roomid } = body;
  // console.log("getRoom: ", roomid);
  try {
    // const db = client.db("mob-unity");
    // const result = await db.collection("rooms").findOne({ roomid: roomid });
    const result = {
      hello: "fucker",
    };
    if (result) {
      return NextResponse.json({
        ok: true,
        message: "Room found successfully",
        status: 200,
        data: result,
      });
    } else {
      return NextResponse.json({
        ok: false,
        message: "Room not found.",
        status: 404,
      });
    }
    // console.log("getRoomResponse: ", response);
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: "Error finding room",
      status: 500,
    });
  }
}

async function addRoom(
  client: MongoClient,
  body: {
    roomid: string;
    createdts: Date;
  }
) {
  try {
    const { roomid, createdts } = body;
    const db = client.db("mob-unity");
    const response = await db
      .collection("rooms")
      .insertOne({ roomid, createdts });
    return NextResponse.json({
      ok: true,
      message: "Room created successfully",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: "Error creating room",
      status: 500,
    });
  }
}

async function addTeamMember(client: MongoClient, body: AddTeamRequestBody) {
  try {
    const { roomid, member } = body;
    const db = client.db("mob-unity");
    const response = await db
      .collection("rooms")
      .updateOne({ roomid }, { $push: { teammembers: member } });
    if (response.modifiedCount === 1) {
      return NextResponse.json({
        ok: true,
        message: "Team member added successfully",
        status: 201,
      });
    } else {
      throw new Error("Error adding team member");
    }
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: "Error adding team member",
      status: 500,
    });
  }
}

async function deleteTeamMember(
  client: MongoClient,
  body: DeleteTeamRequestBody
) {
  try {
    const { roomid, memberid } = body;
    const db = client.db("mob-unity");
    const response = await db
      .collection("rooms")
      .updateOne(
        { roomid },
        { $pull: { teammembers: { memberid: memberid } } }
      );
    if (response.modifiedCount === 1) {
      return NextResponse.json({
        ok: true,
        message: "Team member deleted successfully",
        status: 201,
      });
    } else {
      throw new Error("Error deleting team member");
    }
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: "Error deleting team member",
      status: 500,
    });
  }
}
