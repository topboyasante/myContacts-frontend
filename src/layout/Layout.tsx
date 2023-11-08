import { IoHomeSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Cookies from "js-cookie";
import { IoIosPersonAdd } from "react-icons/io";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const route = useLocation();
  const token = Cookies.get("accessToken");
  return (
    <main>
      <Navbar isAuthenticated={token ? true : false} />
      <section className="w-full pt-[7vh]">
        <section className="max-w-screen-xl mx-auto">{children}</section>
        <Link
          to={route.pathname === "/contacts" ? `/contacts/add` : `/contacts`}
        >
          <div className="fixed bottom-5 right-0 m-8 bg-secondary rounded-full p-3 my-2">
            {route.pathname === "/contacts" ? (
              <IoIosPersonAdd size={30} />
            ) : (
              <IoHomeSharp size={30} />
            )}
          </div>
        </Link>
      </section>
    </main>
  );
}

export default Layout;
