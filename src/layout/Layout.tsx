import Navbar from "../components/navigation/Navbar";
import Cookies from "js-cookie";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const token = Cookies.get("accessToken");
  return (
    <main>
      <Navbar isAuthenticated={token ? true : false} />
      <section className="w-full pt-[7vh]">
        <section className="max-w-screen-xl mx-auto p-5">{children}</section>
      </section>
    </main>
  );
}

export default Layout;
