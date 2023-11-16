import React from "react";
import { TodoModel } from "../../models/TodoModel";
import { Timestamp } from "firebase/firestore";
import { Card, Dropdown } from "react-bootstrap";

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
    }).format(date);

    return formattedDate;
  };

  //need to change this custom toggle
  const CustomToggle = React.forwardRef(
    ({ children, onClick }: any, ref: any) => (
      <a
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
      </a>
    )
  );

  return (
    <Card className="text-warning ">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} variant="success">
          <h2>{todo.title}</h2>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.ItemText>
            <p>{todo.content}</p>
            <p>{todo.completed}</p>
            <p>{dateFormatter(todo.createdAt)}</p>
          </Dropdown.ItemText>
        </Dropdown.Menu>
      </Dropdown>

      {/* <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
    </Card>
  );
};

export default Todo;
