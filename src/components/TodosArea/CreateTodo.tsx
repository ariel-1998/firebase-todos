import React, { FormEvent, useRef, useState } from "react";
import { useTodos } from "../../context/TodoProvider";
import { useAuth } from "../../context/AuthContext";
import { TodoModelWithFieldValue } from "../../models/TodoModel";
import { serverTimestamp } from "firebase/firestore";

const CreateTodo: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { addTodo } = useTodos();
  const { user } = useAuth();

  const createTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !content.trim() || !title.trim()) return;
    const todo: TodoModelWithFieldValue = {
      userId: user.uid,
      title: title,
      content: content,
      completed: false,
      createdAt: serverTimestamp(),
    };

    setTitle("");
    setContent("");
    addTodo(todo);
  };

  return (
    <div>
      <form onSubmit={createTodo}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CreateTodo;
