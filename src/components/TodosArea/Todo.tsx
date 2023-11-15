import React from "react";
import { TodoModel } from "../../models/TodoModel";
import { FieldValue, Timestamp } from "firebase/firestore";

type TodoProps = {
  todo: TodoModel;
};

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const dateFormatter = (unknownDate: Timestamp | Date) => {
    if (!unknownDate) return;
    let date;
    if (unknownDate instanceof Timestamp) {
      date = unknownDate.toDate();
    } else {
      date = unknownDate;
    }
    const formattedDate = new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).format(date as Date);

    return formattedDate;
  };
  return (
    <div>
      <h2>{todo.title}</h2>
      <p>{todo.content}</p>
      <p>{todo.completed}</p>
      <p>{dateFormatter(todo.createdAt)}</p>
    </div>
  );
};

export default Todo;
