import { Navigate, Outlet } from "react-router-dom";
import Layout from "../layout/Layout";

type RouteProps = {
  isAuthenticated: boolean;
};

function ProtectedRoutes({ isAuthenticated }: RouteProps) {
  if (isAuthenticated) {
    return (
      <Layout>
        <Outlet/>
      </Layout>
    );
  } else {
    return <Navigate to={`/auth/sign-in`} />;
  }
}

export default ProtectedRoutes;