import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/homepage/Homepage";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import Main from "../pages/contacts/Main";
import AddContacts from "../pages/contacts/AddContacts";
import EditContact from "../pages/contacts/EditContact";
import Settings from "../pages/settings/Settings";
import ProfileSettings from "../pages/settings/ProfileSettings";
import SecuritySettings from "../pages/settings/SecuritySettings";
import ChangePassword from "../pages/settings/ChangePassword";

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

      <Route path="/settings" element={<ProtectedRoutes />}>
        <Route index element={<Settings />} />
        <Route path="profile" element={<ProfileSettings />} />
        <Route path="security">
          <Route index element={<SecuritySettings />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
