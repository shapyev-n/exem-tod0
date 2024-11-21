/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./EditPage.module.scss";
import { useUpdateTodoMutation } from "@/redux/api/todo";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function EditPage({ selectedTodo, setMod }: any) {
  const { register, reset, handleSubmit } = useForm<Todo>();
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();

  useEffect(() => {
    if (selectedTodo) {
      reset(selectedTodo);
    }
  }, [selectedTodo, reset]);

  const onSubmit: SubmitHandler<Todo> = async (data) => {
    try {
      await updateTodo(data);
      toast.success("Todo successfully");
      setMod(false);
    } catch (error) {
      toast.error("Error creating");
      console.log(error);
    } finally {
      reset();
    }
  };

  return (
    <div className={scss.EditPage}>
      <div className="container">
        <div className={scss.content}>
          <h1>Create Todo</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="title"
              {...register("title", { required: true })}
            />
            <input
              type="text"
              placeholder="image"
              {...register("image", { required: true })}
            />
            {isLoading && <button type="button">editing...</button>}
            {!isLoading && <button type="submit">edit</button>}
          </form>
        </div>
      </div>
    </div>
  );
}
