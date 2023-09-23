"use client";
import React, { useState } from "react";
import NewGoalForm from "./NewGoalForm";
import { Goal } from "@/types/room";

interface GoalsSectionProps {
  defaultGoals: Goal[];
}

const GoalsSection: React.FC<GoalsSectionProps> = ({ defaultGoals }) => {
  const [goals, setGoals] = useState<Goal[]>(defaultGoals);
  const currentGoal = goals[0];

  const handleAddGoal = (newGoal: Goal) => {
    setGoals([...goals, newGoal]);
  };

  const handleToggleComplete = (goalid: string) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.goalid === goalid ? { ...goal, complete: !goal.complete } : goal
      )
    );
  };

  const handleRemoveGoal = (goalid: string) => {
    setGoals(goals.filter((goal) => goal.goalid !== goalid));
  };

  return (
    <div className="prose">
      <div className="mb-16">
        <h1>{"Current Goal"}</h1>
        <h2>{currentGoal?.title}</h2>
        <p>{currentGoal?.description}</p>
      </div>
      <div className="flex">
        <h2 className="m-0 w-full">Goals</h2>
        <button
          className="btn btn-primary"
          // @ts-ignore
          onClick={() => window.goal_form.showModal()}
        >
          Add Goal
        </button>
        <dialog id="goal_form" className="modal">
          <NewGoalForm onAddGoal={handleAddGoal} />
        </dialog>
      </div>
      <div className="space-y-2">
        {goals.map((goal, index) => (
          <React.Fragment key={index}>
            <div
              key={goal.goalid}
              className="flex gap-4 items-center justify-between"
            >
              <input
                type="checkbox"
                checked={goal.complete}
                className="checkbox"
                onChange={() => handleToggleComplete(goal.goalid)}
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{goal.title}</h2>
                <p className="flex-grow">{goal.description}</p>
              </div>
              <button
                className="btn btn-circle btn-xs btn-outline"
                onClick={() => handleRemoveGoal(goal.goalid)}
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
            <div className="divider" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default GoalsSection;
