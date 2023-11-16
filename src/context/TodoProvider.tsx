import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TodoModel, TodoModelWithFieldValue } from "../models/TodoModel";
import { useAuth } from "./AuthContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { DB } from "../utils/firebaseConfig";
import { v4 as uuidV4 } from "uuid";

type TodoContextProps = {
  todos?: TodoModel[];
  addTodo: (todo: TodoModelWithFieldValue) => Promise<void>;
  updateTodoComplition: (id: string, completed: boolean) => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
};

const TodoContext = createContext<TodoContextProps | null>(null);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used inside TodoProvider");
  return context;
};

type TodoProviderProps = {
  children: ReactNode;
};

const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<TodoModel[]>();
  const { user } = useAuth();
  const todosRef = collection(DB, "todos");

  useEffect(() => {
    if (!user) return;
    const q = query(
      todosRef,
      where("userId", "==", user.uid),
      orderBy("createdAt")
    );
    const getTodos = async () => {
      const querySnapshot = await getDocs(q);
      const todos = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as TodoModel[];
      setTodos(todos);
    };

    getTodos();
  }, [user]);

  const addTodo = async (todo: TodoModelWithFieldValue) => {
    try {
      const tempId = uuidV4();
      const tempTodo: TodoModel = {
        ...todo,
        createdAt: new Date(),
        id: tempId,
      };

      setTodos((prev) => (prev ? [tempTodo, ...prev] : [tempTodo]));
      const querySnapshot = await addDoc(todosRef, todo);
      setTodos((prev) =>
        prev?.map((todo) => {
          if (todo.id !== tempId) return todo;
          else return { ...todo, id: querySnapshot.id };
        })
      );
    } catch (error) {
      //handle errors
      console.error(error);
    }
  };

  const updateTodoComplition = async (id: string, completed: boolean) => {
    const docRef = doc(DB, "todos", id);
    setTodos((prev) =>
      prev?.map((todo) => {
        if (todo.id !== id) return todo;
        return { ...todo, completed };
      })
    );
    try {
      await updateDoc(docRef, { completed });
    } catch (error) {
      //handle error
      console.log(error);
      setTodos((prev) =>
        prev?.map((todo) => {
          if (todo.id !== id) return todo;
          return { ...todo, completed: !completed };
        })
      );
    }
  };

  const removeTodo = async (id: string) => {
    const deleteDocRef = doc(DB, "todos", id);
    try {
      await deleteDoc(deleteDocRef);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, updateTodoComplition, removeTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
