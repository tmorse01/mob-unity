"use client";
import React, { useState } from "react";

interface GoalsSectionProps {
  goals: string[];
  onToggleGoal: (index: number) => void;
}

const GoalsSection: React.FC<GoalsSectionProps> = ({ goals, onToggleGoal }) => {
  return (
    <div className="my-4">
      <h2 className="text-lg font-semibold">Goals</h2>
      <ul className="list-disc pl-6">
        {goals.map((goal, index) => (
          <li key={index} className="mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={false} // Add the actual checked status
                onChange={() => onToggleGoal(index)}
                className="form-checkbox mr-2"
              />
              {goal}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalsSection;
