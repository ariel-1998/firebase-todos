import React from "react";
import { TodoModel } from "../../models/TodoModel";
import { Timestamp } from "firebase/firestore";
import { Card, Form } from "react-bootstrap";
import { useTodos } from "../../context/TodoProvider";
import DeleteTodoModal from "./DeleteTodoModal";

type TodoProps = {
  todo: TodoModel;
};

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const { updateTodoComplition } = useTodos();
  const date = dateFormatter(todo.createdAt);
  const [dateInYears, timeInDay] = date?.split(",") || [];

  function dateFormatter(unknownDate: Timestamp | Date) {
    if (!unknownDate) return;
    let date;
    if (unknownDate instanceof Timestamp) {
      date = unknownDate.toDate();
    } else {
      date = unknownDate;
    }
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).format(date);
  }

  return (
    <Card className={`px-4 py-2 ${todo.complete && "disabled-todo"} todo-card`}>
      <div className="d-flex justify-content-between">
        <DeleteTodoModal todo={todo} />
        <Form.Check
          type="switch"
          defaultChecked={todo.complete}
          onChange={(e) => updateTodoComplition(todo.id, e.target.checked)}
        />
      </div>
      <h5 className="border-bottom my-1 fw-bold">{todo.title}</h5>
      <p className="todo-content overflow-auto mt-1">{todo.content}</p>
      <div className="d-flex justify-content-between">
        <span>{timeInDay}</span>
        <span
          className={`${todo.complete ? "text-success" : "text-danger"}
        fw-bold `}
        >
          {todo.complete ? "Completed" : "Active"}
        </span>

        <span>{dateInYears}</span>
      </div>
    </Card>
  );
};

export default Todo;
