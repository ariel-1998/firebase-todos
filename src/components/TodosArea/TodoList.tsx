import React from "react";
import { useTodos } from "../../context/TodoProvider";
import Todo from "./Todo";
import { Col, Container, Row } from "react-bootstrap";
import TodoSkeleton from "./TodoSkeleton";
import AuthContainer from "../AuthArea/AuthContainer";

const TodoList: React.FC = () => {
  const { todos, loadingTodos } = useTodos();

  return (
    <Container fluid>
      <Row xs={1} sm={2} lg={3} xl={4} className={`g-3 p-3`}>
        {loadingTodos &&
          Array.from({ length: 12 }).map((_, i) => (
            <Col key={i}>
              <TodoSkeleton />
            </Col>
          ))}
        {todos &&
          todos.map((todo) => (
            <Col key={todo.id}>
              <Todo todo={todo} />
            </Col>
          ))}

        {!loadingTodos && !todos && (
          <AuthContainer>
            <div className="text-center">
              There was an error, Could not recive Todos.
            </div>
          </AuthContainer>
        )}
        {!loadingTodos && todos && !todos.length && (
          <AuthContainer>
            <div className="text-center">No tasks were saved.</div>
          </AuthContainer>
        )}
      </Row>
    </Container>
  );
};

export default TodoList;
