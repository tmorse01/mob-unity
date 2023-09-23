import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { pusherServer } from "@/lib/pusher";


export async function POST(request: NextRequest) {
  try {
    const { roomid, name } = await request.json();
    const client = await clientPromise;
    const db = client.db("mob-unity");
    await db.collection("teams").insertOne({ roomid, name });
    console.log("trigger")
    pusherServer.trigger(`room__${roomid}`, "add_team_member", {
      message: "hello world"
    });
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

export async function GET(request: NextRequest) {
  try {
    const roomid = request.nextUrl.searchParams.get("roomid");
    const client = await clientPromise;
    const db = client.db("mob-unity");
    const teammembers = await db.collection("teams").find({ roomid }).toArray();
    return NextResponse.json({
      ok: true,
      teammembers: teammembers,
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: "Error getting team members: " + error,
      status: 500,
    });
  }
}
