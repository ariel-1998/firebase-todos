import React from "react";
import { TodoModel } from "../../models/TodoModel";
import { Timestamp } from "firebase/firestore";
import { Card, Form } from "react-bootstrap";
import { useTodos } from "../../context/TodoProvider";

type TodoProps = {
  todo: TodoModel;
};

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const { updateTodoComplition, removeTodo } = useTodos();
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
    <Card className="flex-grow-1 todo-card">
      <div className={`p-2 todo-card`}>
        <Form.Check
          type="switch"
          defaultChecked={todo.completed}
          onChange={(e) => updateTodoComplition(todo.id, e.target.checked)}
        />
        <button onClick={() => removeTodo(todo.id)}>Remove</button>
        <h4 className="text-center ">{todo.title}</h4>
        <p className="todo-content overflow-auto">{todo.content}</p>
        <p>{todo.completed}</p>
        <div className="d-flex justify-content-between">
          <span>{timeInDay}</span>
          <span>{dateInYears}</span>
        </div>
      </div>
    </Card>
  );
};

export default Todo;
