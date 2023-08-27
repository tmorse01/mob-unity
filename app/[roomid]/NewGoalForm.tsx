"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Goal } from "../types";

interface NewGoalFormProps {
  onAddGoal: (newGoal: Goal) => void;
}

interface FormData {
  title: string;
  description: string;
}

const NewGoalForm: React.FC<NewGoalFormProps> = ({ onAddGoal }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const newGoal = {
      id: uuidv4(),
      ...data,
      complete: false,
    };
    if (data.title.trim() && data.description.trim()) {
      onAddGoal(newGoal);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="prose grid gap-4 items-center p-4 border-b">
        <input
          type="text"
          placeholder="Title"
          className="input"
          {...register("title")}
        />
        <input
          type="textarea"
          placeholder="Description"
          className="input"
          {...register("description")}
        />
        <button type="submit" className="btn btn-success">
          Add Goal
        </button>
      </div>
    </form>
  );
};

export default NewGoalForm;
