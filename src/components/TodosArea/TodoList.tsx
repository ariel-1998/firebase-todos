import React from "react";
import { useTodos } from "../../context/TodoProvider";
import Todo from "./Todo";
import { Container } from "react-bootstrap";

const TodoList: React.FC = () => {
  const { todos } = useTodos();
  return (
    <Container fluid className="d-flex flex-row flex-wrap">
      {todos?.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </Container>
  );
};

export default TodoList;
