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
      // @ts-ignore
      window.goal_form.close();
    }
  };

  return (
    <form
      method="dialog"
      className="modal-box"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="prose grid gap-4 items-center p-4">
        <h3 className="font-bold text-lg">Add a new goal!</h3>
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered"
          {...register("title")}
        />
        <input
          type="textarea"
          placeholder="Description"
          className="textarea textarea-bordered"
          {...register("description")}
        />
        <div className="modal-action">
          <button type="submit" className="btn btn-success">
            Add Goal
          </button>
          {/* @ts-ignore */}
          <button className="btn" onClick={() => window.goal_form.close()}>
            Close
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewGoalForm;
