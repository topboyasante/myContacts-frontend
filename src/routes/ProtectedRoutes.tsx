import { Navigate, Outlet } from "react-router-dom";
import Layout from "../layout/Layout";
import Cookies from "js-cookie";

function ProtectedRoutes() {
  const token = Cookies.get("accessToken");

  if (token) {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  } else {
    return <Navigate to={`/auth/sign-in`} />;
  }
}

export default ProtectedRoutes;
