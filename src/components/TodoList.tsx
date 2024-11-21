/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import scss from "./TodoList.module.scss";
import { useGetTodoQuery, useDeleteTodoMutation } from "@/redux/api/todo";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditPage from "./edit/EditPage";

export default function TodoList() {
  const { data = [], isLoading } = useGetTodoQuery();
  const [deleteTodo] = useDeleteTodoMutation();

  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<any | null>(null);
  const [mod, setMod] = useState<boolean>(false);

  const handleDelete = async (id: number) => {
    setLoadingId(id);

    try {
      await deleteTodo({ id }).unwrap();
      toast.success("Deleted successfully!");
    } catch (error) {
      console.error("Failed to delete:", error);
      toast.error("Failed to delete. Please try again later.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleEdit = (todo: any) => {
    setSelectedTodo(todo);
    setMod(true);
  };

  return (
    <div className={scss.TodoList}>
      <ToastContainer />
      <div className="container">
        <div className={scss.content}>
          <nav>
            <Link href={"/"}>Todo List</Link>
            <Link href={"/create"}>Add Todo</Link>
          </nav>

          {isLoading && <center>loading...</center>}
          {!isLoading && data.length === 0 && <center>No todo</center>}
          <div className={scss.todos}>
            {data.length > 0 &&
              data.map((el) => (
                <div className={scss.card} key={el.id}>
                  <div
                    style={{
                      background: `url(${el.image}) no-repeat center / cover`,
                      width: "200px",
                      height: "200px",
                    }}
                  ></div>
                  <p>{el.title}</p>
                  <div className={scss.btns}>
                    <button onClick={() => handleEdit(el)}>edit</button>
                    {loadingId === el.id ? (
                      <button disabled>deleting...</button>
                    ) : (
                      <button onClick={() => handleDelete(el.id)}>
                        delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {mod && <EditPage selectedTodo={selectedTodo} setMod={setMod} />}
    </div>
  );
}
