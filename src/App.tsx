import Signup from "./components/AuthArea/Signup";
import Login from "./components/AuthArea/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/AuthArea/ProtectedRoute";
import ForgotPassword from "./components/AuthArea/ForgotPassword";
import UpdateProfile from "./components/AuthArea/UpdateProfile";
import TodoList from "./components/TodosArea/TodoList";
import CreateTodo from "./components/TodosArea/createTodo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/**Todos Routes */}
        <Route path="/todos" element={<ProtectedRoute redirect="/login" />}>
          <Route path="" Component={TodoList} />
          <Route path="create" Component={CreateTodo} />
        </Route>

        {/**Auth Routes */}
        <Route element={<ProtectedRoute redirect="/login" />}>
          <Route path="/" Component={Dashboard} />
          <Route path="/update-profile" Component={UpdateProfile} />
        </Route>
        <Route path="/signup" Component={Signup} />
        <Route path="/login" Component={Login} />
        <Route path="/forgot-password" Component={ForgotPassword} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
