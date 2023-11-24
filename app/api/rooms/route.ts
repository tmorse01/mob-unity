import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { pusherServer } from "@/lib/pusher";

import clientPromise from "@/lib/mongodb";
import {
  AddTeamRequestBody,
  DeleteTeamRequestBody,
  UpdateTeamRequestBody,
  EditDurationBody,
  RoomData,
} from "@/types/room";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const roomid = searchParams.get("roomid");
  // console.log("route for get room", roomid);
  if (roomid) {
    const client = await clientPromise;
    const result = await getRoom(client, roomid);
    return result;
  } else {
    return NextResponse.json({
      ok: false,
      message: "Error provide a roomid",
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  // make an update to the room
  // case per action like
  // addRoom, getRoom
  // addTeamMember, deleteTeamMember, updateTeamMembers
  // addGoal, updateGoal, deleteGoal
  // startTimer, stopTimer, timerReset, durationChange

  const body = await request.json();
  const { roomid } = body;
  console.log("POST", body);
  const client = await clientPromise;
  var response;
  if (body.action === "addRoom") {
    response = await addRoom(client, body);
  } else if (body.action === "addTeamMember") {
    response = await addTeamMember(client, body);
  } else if (body.action === "deleteTeamMember") {
    response = await deleteTeamMember(client, body);
  } else if (body.action === "updateTeamMembers") {
    response = await updateTeamMembers(client, body);
  } else if (body.action === "editDuration") {
    response = await editDuration(client, body);
  } else {
    response = NextResponse.json({
      ok: false,
      message: "Invalid action",
      status: 500,
    });
  }
  const getUpdatedRoomResponse = await getRoom(client, roomid);
  const updatedRoomData = await getUpdatedRoomResponse.json();
  pusherServer.trigger(`room__${roomid}`, "update_room", {
    room: updatedRoomData.data,
  });
  if (getUpdatedRoomResponse.ok === false) {
    return getUpdatedRoomResponse;
  }

  return response;
}

async function getRoom(client: MongoClient, roomid: string) {
  try {
    const db = client.db("mob-unity");
    const result = await db.collection("rooms").findOne({ roomid: roomid });
    // console.log("getRoom route", result);
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

async function addRoom(client: MongoClient, body: RoomData) {
  try {
    const { roomid, teammembers, goals, timer, createdts } = body;
    const db = client.db("mob-unity");
    const response = await db
      .collection("rooms")
      .insertOne({ roomid, teammembers, goals, timer, createdts });
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

async function updateTeamMembers(
  client: MongoClient,
  body: UpdateTeamRequestBody
) {
  try {
    const { roomid, teammembers } = body;
    const db = client.db("mob-unity");
    const response = await db
      .collection("rooms")
      .updateOne({ roomid }, { $set: { teammembers: teammembers } });
    if (response.modifiedCount === 1) {
      return NextResponse.json({
        ok: true,
        message: "Team members updated successfully",
        status: 201,
      });
    } else {
      throw new Error("Error updating team members");
    }
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: "Error updating team member",
      status: 500,
    });
  }
}

async function editDuration(client: MongoClient, body: EditDurationBody) {
  try {
    const { roomid, duration } = body;
    const db = client.db("mob-unity");
    const response = await db
      .collection("rooms")
      .updateOne({ roomid }, { $set: { timer: { duration: duration } } });
    if (response.modifiedCount === 1) {
      return NextResponse.json({
        ok: true,
        message: "Duration updated successfully",
        status: 201,
      });
    } else {
      throw new Error("Error updating duration");
    }
  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      message: "Error updating duration " + error.message,
      status: 500,
    });
  }
}
