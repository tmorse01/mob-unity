import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

import clientPromise from "@/lib/mongodb";

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
  if (body.action === "addRoom") {
    return await addRoom(client, body);
  } else if (body.action === "getRoom") {
    return await getRoom(client, body);
  } else if (body.action === "addTeamMember") {
    return await addTeamMember(client, body);
  } else if (body.action === "deleteTeamMember") {
    return await deleteTeamMember(client, body);
  } else {
    return NextResponse.json({
      ok: false,
      message: "Invalid action",
      status: 500,
    });
  }
}

async function getRoom(client: MongoClient, body: { roomid: string }) {
  try {
    console.log("response from getRoom", body.roomid);
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

async function addTeamMember(client: MongoClient, request: NextRequest) {
  try {
    const { roomid, member } = await request.json();
    const db = client.db("mob-unity");
    const response = db
      .collection("rooms")
      .updateOne({ roomid }, { $push: { teamMembers: member } });
    return NextResponse.json({
      ok: true,
      message: "Team member added successfully",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: "Error adding team member",
      status: 500,
    });
  }
}

async function deleteTeamMember(client: MongoClient, request: NextRequest) {
  try {
    const { roomid, member } = await request.json();
    const db = client.db("mob-unity");
    const response = db
      .collection("rooms")
      .updateOne({ roomid }, { $pull: { teamMembers: member } });
    return NextResponse.json({
      ok: true,
      message: "Team member deleted successfully",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: "Error deleting team member",
      status: 500,
    });
  }
}
