import React, { FormEvent, useState } from "react";
import { useTodos } from "../../context/TodoProvider";
import { useAuth } from "../../context/AuthContext";
import { TodoModelWithFieldValueAndNoId } from "../../models/TodoModel";
import { serverTimestamp } from "firebase/firestore";
import AuthContainer from "../AuthArea/AuthContainer";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CreateTodo: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addTodo } = useTodos();
  const { user } = useAuth();
  const navigate = useNavigate();

  const createTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !content.trim() || !title.trim()) return;
    const todo: TodoModelWithFieldValueAndNoId = {
      userId: user.uid,
      title: title,
      content: content,
      complete: false,
      createdAt: serverTimestamp(),
    };

    setTitle("");
    setContent("");
    setError("");
    setLoading(true);
    addTodo(todo)
      .then(() => navigate("/"))
      .catch(() => setError("Could not create note, try again."))
      .finally(() => setLoading(false));
  };

  return (
    <AuthContainer>
      <Card>
        <Card.Header className="text-center">
          <h3>
            <strong>Add Todo</strong>
          </h3>
        </Card.Header>
        <Card.Body className="p-5">
          {error && (
            <Alert variant="danger" className="danger">
              {error}
            </Alert>
          )}
          <Form onSubmit={createTodo}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Type your text here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mt-4">
              {!loading ? "Add Todo" : <Spinner animation="border" />}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </AuthContainer>
  );
};

export default CreateTodo;
