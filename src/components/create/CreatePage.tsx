"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./CreatePage.module.scss";
import { useCreateTodoMutation } from "@/redux/api/todo";
import { toast } from "react-toastify";
import Link from "next/link";

export default function CreatePage() {
  const { register, reset, handleSubmit } = useForm<Todo>();
  const [createTodo, { isLoading }] = useCreateTodoMutation();

  const onSubmit: SubmitHandler<Todo> = async (data) => {
    try {
      await createTodo(data);
      toast.success("Todo successfully");
    } catch (error) {
      toast.error("Error creating");
      console.log(error);
    } finally {
      reset();
    }
  };

  return (
    <div className={scss.CreatePage}>
      <div className="container">
        <div className={scss.content}>
          <nav>
            <Link href={"/"}>Todo List</Link>
            <Link href={"/create"}>Add Todo</Link>
          </nav>
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
            {isLoading && <button type="button">creating...</button>}
            {!isLoading && <button type="submit">create</button>}
          </form>
        </div>
      </div>
    </div>
  );
}
