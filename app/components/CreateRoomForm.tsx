"use client";
import { defaultRoom } from "@/types/room";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  roomid: string;
}

export default function CreateRoomForm() {
  const { register, handleSubmit } = useForm<FormData>();
  const [error, setError] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    const roomid = data.roomid;
    setLoading(true);
    try {
      const createdts = Date.now();
      // covert to fetch potentially for nextjs
      const response = await axios.post("/api/rooms", {
        action: "addRoom",
        ...defaultRoom,
        roomid,
        createdts,
      });
      if (response.data.ok === false) throw new Error(response.data.message);
      router.push("/" + roomid);
      setLoading(false);
    } catch (error: any) {
      // Handle error
      console.error(error);
      setError(error.message);
      // Clear the error message after 5 seconds (5000 milliseconds)
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div className="grid gap-4 w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid items-center justify-center grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            className="max-w-full px-4 py-2 input input-bordered md:col-span-1"
            placeholder="Create or join a room..."
            {...register("roomid")}
          />
          <button
            type="submit"
            className="px-6 py-2 ml-4 font-semibold rounded-full btn btn-primary md:col-span-1"
          >
            {loading && <span className="loading loading-spinner" />}
            Get Started
          </button>
        </div>
      </form>
      {error && (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
