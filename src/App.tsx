import Signup from "./components/AuthArea/Signup";
import Login from "./components/AuthArea/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/AuthArea/ProtectedRoute";
import ForgotPassword from "./components/AuthArea/ForgotPassword";
import UpdateProfile from "./components/AuthArea/UpdateProfile";
import TodoList from "./components/TodosArea/TodoList";
import Profile from "./components/AuthArea/Profile";
import CreateTodo from "./components/TodosArea/CreateTodo";
import Layout from "./components/LayoutArea/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/**Todos Routes */}
        <Route path="/todos" element={<ProtectedRoute redirect="/login" />}>
          <Route path="" Component={Layout} />
          <Route path="create" Component={CreateTodo} />
        </Route>

        {/**Auth Routes */}
        <Route element={<ProtectedRoute redirect="/login" />}>
          <Route path="/profile" Component={Profile} />
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
