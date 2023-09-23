import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { pusherServer } from "@/lib/pusher";

import clientPromise from "@/lib/mongodb";
import { AddTeamRequestBody, DeleteTeamRequestBody } from "@/types/room";

export async function POST(request: NextRequest) {
  // make an update to the room
  // case per action like
  // addRoom, getRoom
  // addTeamMember, deleteTeamMember
  // addGoal, updateGoal, deleteGoal
  // startTimer, stopTimer, timerReset, durationChange
  // rotateRoles
  const body = await request.json();
  const client = await clientPromise;
  var response;
  if (body.action === "addRoom") {
    response = await addRoom(client, body);
  } else if (body.action === "getRoom") {
    response = await getRoom(client, body);
  } else if (body.action === "addTeamMember") {
    response = await addTeamMember(client, body);
  } else if (body.action === "deleteTeamMember") {
    response = await deleteTeamMember(client, body);
  } else {
    response = NextResponse.json({
      ok: false,
      message: "Invalid action",
      status: 500,
    });
  }
  const getUpdatedRoomResponse = await getRoom(client, body);
  const updatedRoomData = await getUpdatedRoomResponse.json();
  pusherServer.trigger(`room__${body.roomid}`, "update_room", {
    room: updatedRoomData.data,
  });
  if (getUpdatedRoomResponse.ok === false) {
    return getUpdatedRoomResponse;
  }

  return response;
}

async function getRoom(client: MongoClient, body: { roomid: string }) {
  try {
    const db = client.db("mob-unity");
    const response = await db
      .collection("rooms")
      .findOne({ roomid: body.roomid });

    return NextResponse.json({
      ok: true,
      message: "Room found successfully",
      status: 200,
      data: response,
    });
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
