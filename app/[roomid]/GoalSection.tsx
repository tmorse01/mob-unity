"use client";
import React, { useState } from "react";
import { Goal } from "../types";
import NewGoalForm from "./NewGoalForm";

interface GoalsSectionProps {}

const exampleGoals = [
  {
    id: "8db7d21f-84f6-4b3b-bb5c-206a2d9c7e89",
    title: "Master Data Structures and Algorithms",
    description:
      "Develop deep understanding of fundamental data structures and algorithms.",
    complete: false,
  },
  {
    id: "3f1f1b8c-6b13-4b22-88b2-8bf1e9575dc5",
    title: "Build a Web Application from Scratch",
    description:
      "Create a functional web app using HTML, CSS, JavaScript, and backend services.",
    complete: false,
  },
  {
    id: "6a21e695-6282-4e4d-8696-3cbf34bfc013",
    title: "Contribute to Open Source Projects",
    description:
      "Contribute to open-source projects by providing code, documentation, or bug fixes.",
    complete: false,
  },
];

const GoalsSection: React.FC<GoalsSectionProps> = () => {
  const [goals, setGoals] = useState<Goal[]>(exampleGoals);

  const handleAddGoal = (newGoal: Goal) => {
    setGoals([...goals, newGoal]);
  };

  const handleToggleComplete = (id: string) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, complete: !goal.complete } : goal
      )
    );
  };

  const handleRemoveGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Goals</h2>
      {/*add current goal display*/}

      <div className="space-y-2">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="flex gap-4 items-center justify-between p-4 border-b"
          >
            <input
              type="checkbox"
              checked={goal.complete}
              className="checkbox"
              onChange={() => handleToggleComplete(goal.id)}
            />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">{goal.title}</h2>
              <p className="flex-grow">{goal.description}</p>
            </div>
            <button
              className="btn btn-circle btn-xs btn-outline"
              onClick={() => handleRemoveGoal(goal.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <NewGoalForm onAddGoal={handleAddGoal} />
    </div>
  );
};

export default GoalsSection;
