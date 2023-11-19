import { FieldValue, Timestamp } from "firebase/firestore";

export type TodoModel = {
  id: string;
  userId: string;
  title: string;
  content: string;
  complete: boolean;
  createdAt: Timestamp | Date;
};

export type TodoModelWithFieldValueAndNoId = Omit<
  TodoModel,
  "createdAt" | "id"
> & {
  createdAt: FieldValue;
};
