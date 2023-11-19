import Signup from "./components/AuthArea/Signup";
import Login from "./components/AuthArea/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/AuthArea/ProtectedRoute";
import ForgotPassword from "./components/AuthArea/ForgotPassword";
import UpdateProfile from "./components/AuthArea/UpdateProfile";
import Profile from "./components/AuthArea/Profile";
import CreateTodo from "./components/TodosArea/CreateTodo";
import Layout from "./components/LayoutArea/Layout";
import TodoList from "./components/TodosArea/TodoList";
import WrongPathRedirect from "./components/WrongPathRedirect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/**Auth Routes */}
        <Route element={<ProtectedRoute redirect="/login" />}></Route>
        <Route path="/signup" Component={Signup} />
        <Route path="/login" Component={Login} />
        <Route path="/forgot-password" Component={ForgotPassword} />

        {/** dashboard */}
        <Route element={<ProtectedRoute redirect="/login" />}>
          {/** todos */}
          <Route path="/" Component={Layout}>
            <Route path="" Component={TodoList} />
            <Route path="create" Component={CreateTodo} />

            {/** profile and profile update */}
            <Route path="profile" Component={Profile} />
            <Route path="update-profile" Component={UpdateProfile} />
          </Route>
        </Route>

        {/** wrong path */}
        <Route path="*" Component={WrongPathRedirect} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
