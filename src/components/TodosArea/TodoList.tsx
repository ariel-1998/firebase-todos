import React from "react";
import { useTodos } from "../../context/TodoProvider";
import Todo from "./Todo";

const TodoList: React.FC = () => {
  const { todos } = useTodos();
  console.log(todos);
  return (
    <div>
      {todos?.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
