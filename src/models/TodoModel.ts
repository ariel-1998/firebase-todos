import { FieldValue, Timestamp } from "firebase/firestore";

export type TodoModel = {
  id: string;
  userId: string;
  title: string;
  content: string;
  completed: boolean;
  createdAt: Timestamp | Date;
};

export type TodoModelWithFieldValue = Omit<TodoModel, "createdAt"> & {
  createdAt: FieldValue;
};
