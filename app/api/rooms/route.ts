import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { roomid, createdts } = await request.json();
    const client = await clientPromise;
    const db = client.db("mob-unity");
    const response = await db
      .collection("rooms")
      .insertOne({ roomid, createdts });
    console.log("response:", response);
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
