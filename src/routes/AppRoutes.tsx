import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/homepage/Homepage";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import Cookies from "js-cookie";
import Main from "../pages/contacts/Main";
import AddContacts from "../pages/contacts/AddContacts";

function AppRoutes() {
  //Find a way to always get the token
  const token = Cookies.get("accessToken");

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/auth/sign-up" element={<Register />} />
      <Route path="/auth/sign-in" element={<Login />} />

      <Route
        path="/contacts"
        element={<ProtectedRoutes isAuthenticated={token ? true : false} />}
      >
        <Route index element={<Main />} />
        <Route path="add" element={<AddContacts/>}/>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
