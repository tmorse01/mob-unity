export interface TeamMember {
  memberid: string;
  name: string;
  role: string;
}

export interface Goal {
  goalid: string;
  title: string;
  description: string;
  complete: boolean;
}

export interface Timer {
  status: string;
  duration: number;
}

export interface RoomData {
  roomid: string;
  teammembers: TeamMember[];
  goals: Goal[];
  timer: Timer;
}

export type AddTeamRequestBody = {
  roomid: string;
  member: TeamMember;
};

export type DeleteTeamRequestBody = {
  roomid: string;
  memberid: string;
};

const exampleJson: RoomData = {
  roomid: "taylor",
  teammembers: [
    {
      name: "Taylor",
      role: "Driver",
      memberid: "7d4c2e8c-cfd5-4e5e-8b0d-eb2c6c31f146",
    },
    {
      name: "Shawn",
      role: "Navigator",
      memberid: "c38f2eb2-5453-4d01-87e6-7ff2ad2b1b4b",
    },
    {
      name: "Thomas",
      role: "Mob",
      memberid: "e0c5d13d-5411-47e1-badf-4a21563e262c",
    },
    {
      name: "Steve",
      role: "Mob",
      memberid: "d9c3d1d8-38f3-4ebd-92e6-65122df21ef4",
    },
    {
      name: "Sarah",
      role: "Mob",
      memberid: "e9ed2ed2-9be4-4ed0-a6e2-0e4a5f02c6c3",
    },
  ],
  goals: [
    {
      goalid: "8db7d21f-84f6-4b3b-bb5c-206a2d9c7e89",
      title: "Master Data Structures and Algorithms",
      description:
        "Develop deep understanding of fundamental data structures and algorithms.",
      complete: false,
    },
    {
      goalid: "3f1f1b8c-6b13-4b22-88b2-8bf1e9575dc5",
      title: "Build a Web Application from Scratch",
      description:
        "Create a functional web app using HTML, CSS, JavaScript, and backend services.",
      complete: false,
    },
    {
      goalid: "6a21e695-6282-4e4d-8696-3cbf34bfc013",
      title: "Contribute to Open Source Projects",
      description:
        "Contribute to open-source projects by providing code, documentation, or bug fixes.",
      complete: false,
    },
  ],
  timer: {
    status: "active",
    duration: 660,
  },
};

export const defaultRoom: RoomData = {
  roomid: "",
  teammembers: [],
  goals: [],
  timer: {
    status: "",
    duration: 660,
  },
};
