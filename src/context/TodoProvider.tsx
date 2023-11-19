import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TodoModel, TodoModelWithFieldValueAndNoId } from "../models/TodoModel";
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
import { errorToast } from "../utils/errorToast";

type TodoContextProps = {
  todos?: TodoModel[];
  addTodo: (todo: TodoModelWithFieldValueAndNoId) => Promise<void>;
  updateTodoComplition: (id: string, complete: boolean) => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
  resetTodosOnLogout(): void;
  loadingTodos: boolean;
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
  const [loadingTodos, setLoadingTodos] = useState(false);
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
      try {
        setLoadingTodos(true);
        const querySnapshot = await getDocs(q);
        const todos = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as TodoModel[];
        setTodos(todos);
        setLoadingTodos(false);
      } catch (error) {
        setLoadingTodos(false);
        errorToast(`Error Could not get todo list.`);
      }
    };

    getTodos();
  }, [user]);

  const addTodo = async (todo: TodoModelWithFieldValueAndNoId) => {
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
      errorToast(`Error Could not add task ${todo.title}.`);
    }
  };

  const updateTodoComplition = async (id: string, complete: boolean) => {
    const docRef = doc(DB, "todos", id);
    setTodos((prev) =>
      prev?.map((todo) => {
        if (todo.id !== id) return todo;
        return { ...todo, complete };
      })
    );
    try {
      await updateDoc(docRef, { complete });
    } catch (error) {
      errorToast(`Error Could not update task.`);
      setTodos((prev) =>
        prev?.map((todo) => {
          if (todo.id !== id) return todo;
          return { ...todo, complete: !complete };
        })
      );
    }
  };

  const removeTodo = async (id: string) => {
    const deleteDocRef = doc(DB, "todos", id);
    try {
      setTodos((prev) => prev?.filter((todo) => todo.id !== id));
      await deleteDoc(deleteDocRef);
    } catch (error) {
      setTodos(todos);
      errorToast(`Error Could not remove task.`);
    }
  };

  const resetTodosOnLogout = () => {
    setTodos(undefined);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loadingTodos,
        addTodo,
        updateTodoComplition,
        removeTodo,
        resetTodosOnLogout,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
