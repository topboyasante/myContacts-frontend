import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/homepage/Homepage";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import Main from "../pages/contacts/Main";
import AddContacts from "../pages/contacts/AddContacts";
import EditContact from "../pages/contacts/EditContact";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/auth/sign-up" element={<Register />} />
      <Route path="/auth/sign-in" element={<Login />} />

      <Route path="/contacts" element={<ProtectedRoutes />}>
        <Route index element={<Main />} />
        <Route path="add" element={<AddContacts />} />
        <Route path="edit/:id" element={<EditContact />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
