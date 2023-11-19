import React from "react";
import { useTodos } from "../../context/TodoProvider";
import Todo from "./Todo";
import { Col, Container, Row } from "react-bootstrap";

const TodoList: React.FC = () => {
  const { todos } = useTodos();
  return (
    <Container fluid>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3 p-3">
        {todos?.map((todo) => (
          <Col key={todo.id}>
            <Todo todo={todo} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TodoList;
