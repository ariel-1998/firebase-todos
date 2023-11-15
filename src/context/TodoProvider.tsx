import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TodoModel, TodoModelWithFieldValue } from "../models/TodoModel";
import { useAuth } from "./AuthContext";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { DB } from "../utils/firebaseConfig";
import { v4 as uuidV4 } from "uuid";

type TodoContextProps = {
  todos?: TodoModel[];
  addTodo: (todo: TodoModelWithFieldValue) => Promise<void>;
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
    const getTodos = async () => {
      const querySnapshot = await getDocs(todosRef);
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
      const temporaryTodo: TodoModel = {
        ...todo,
        createdAt: new Date(),
        id: tempId,
      };
      setTodos((prev) => (prev ? [temporaryTodo, ...prev] : [temporaryTodo]));

      const querySnapshot = await addDoc(todosRef, todo);

      setTodos((prev) =>
        prev?.map((todo) => {
          if (todo.id !== tempId) return todo;
          else return { ...todo, id: querySnapshot.id };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
