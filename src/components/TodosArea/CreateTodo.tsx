import React, { FormEvent, useRef } from "react";
import { useTodos } from "../../context/TodoProvider";
import { useAuth } from "../../context/AuthContext";
import { TodoModel, TodoModelWithFieldValue } from "../../models/TodoModel";
import { serverTimestamp } from "firebase/firestore";

type createTodoProps = {
  // Define props here
};

const CreateTodo: React.FC<createTodoProps> = ({}) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLInputElement | null>(null);
  const { addTodo } = useTodos();
  const { user } = useAuth();

  const createTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const titleInput = titleRef.current;
    const contentInput = contentRef.current;
    if (!user || !titleInput?.value.trim() || !contentInput?.value.trim())
      return;

    const todo: TodoModelWithFieldValue = {
      userId: user.uid,
      title: titleInput.value,
      content: contentInput.value,
      completed: false,
      createdAt: serverTimestamp(),
    };

    addTodo(todo);
  };

  return (
    <div>
      <form onSubmit={createTodo}>
        <input type="text" placeholder="title" ref={titleRef} />
        <input type="text" placeholder="content" ref={contentRef} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CreateTodo;
