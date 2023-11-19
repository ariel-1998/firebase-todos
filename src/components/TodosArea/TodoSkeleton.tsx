import React from "react";
import { Card, CloseButton, Form, Placeholder } from "react-bootstrap";

const TodoSkeleton: React.FC = () => {
  return (
    <Card className={`px-4 py-2`}>
      <div className="d-flex justify-content-between">
        <CloseButton className="p-0" />
        <Form.Check type="checkbox" disabled checked={Math.random() > 0.5} />
      </div>
      <Placeholder
        xs={12}
        as="h6"
        size="sm"
        bg="secondary"
        animation="wave"
        className={"border-bottom my-3 "}
      />
      <div className="todo-content  mt-1">
        <Placeholder
          size="xs"
          bg="secondary"
          animation="wave"
          as={"p"}
          className="w-85"
        />
        <Placeholder
          size="xs"
          bg="secondary"
          animation="wave"
          as={"p"}
          className="w-70"
        />
        <Placeholder
          size="xs"
          bg="secondary"
          animation="wave"
          as={"p"}
          className="w-75"
        />
        <Placeholder
          size="xs"
          bg="secondary"
          animation="wave"
          as={"p"}
          className="w-50"
        />
      </div>
    </Card>
  );
};

export default TodoSkeleton;
