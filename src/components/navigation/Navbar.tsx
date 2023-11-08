import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import DropDown from "../ui/DropDown";
import Cookies from "js-cookie";
import  useFetchData  from "../../hooks/useFetchData";
import Avatar from "react-avatar";

type NavbarProps = {
  isAuthenticated: boolean;
};

function Navbar({ isAuthenticated }: NavbarProps) {
  const [navIsOpen, setNavIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { UserDetails:user } = useFetchData<IUser>("users/current", "currentUser");

  function LogOut() {
    Cookies.remove("accessToken");
    navigate("/auth/sign-in");
  }

  return (
    <header className="">
      <nav className="w-full h-[7vh] fixed left-0 top-0 z-50 bg-tertiary text-white">
        <section className="flex max-w-screen-xl mx-auto h-full justify-between items-center p-5">
          {/* Left */}
          <section>
            <Link to={isAuthenticated ? `/contacts` : `/`}>
              <p className="font-semibold text-lg md:text-2xl">
                My<span className="text-secondary">Contacts</span>
              </p>
            </Link>
          </section>
          {/* Right */}
          <section>
            {isAuthenticated ? (
              <section className="hidden lg:flex gap-5 items-center">
                <DropDown
                  MenuButtonContent={
                    <section className="flex items-center">
                      <section className="flex items-center gap-2">
                        <Avatar size="40" round />
                        <p>{user?.username}</p>
                      </section>
                      <BiChevronDown className="text-xl" />
                    </section>
                  }
                  MenuItemsContent={
                    <section className="flex flex-col gap-y-2">
                      <Link to={`/settings`}>
                        <section className="flex items-center gap-3">
                          <BsGear />
                          <p className="font-semibold text-sm">Settings</p>
                        </section>
                      </Link>
                      <button
                        onClick={LogOut}
                        className="flex items-center gap-3"
                      >
                        <FiLogOut />
                        <p className="font-semibold text-sm">Log Out</p>
                      </button>
                    </section>
                  }
                />
              </section>
            ) : (
              <section className="hidden lg:flex gap-5 items-center">
                <Link to={`/auth/sign-in`}>
                  <button className="border border-secondary rounded-full p-2 w-[100px] text-sm">
                    Sign In
                  </button>
                </Link>
                <Link to={`/auth/sign-up`}>
                  <button className="bg-secondary text-tertiary rounded-full p-2 w-[100px] text-sm">
                    Sign Up
                  </button>
                </Link>
              </section>
            )}
          </section>
          {/* Right - Mobile */}
          <section className="lg:hidden text-3xl">
            <button
              onClick={() => setNavIsOpen(!navIsOpen)}
              className="appearance-none outline-none"
            >
              <AiOutlineMenu />
            </button>
          </section>
        </section>
      </nav>
      <section
        className={
          navIsOpen
            ? "lg:hidden fixed z-[40] h-auto pt-[7vh] bg-white border-b w-full top-0 left-0 ease duration-500"
            : "lg:hidden fixed z-[40] h-auto pt-[7vh] bg-white border-b w-full top-[-50vh] left-0 ease duration-500"
        }
      >
        {isAuthenticated ? (
          <section className="bg-white">
            <section className="flex flex-col lg:hidden gap-5 lg:items-center p-5">
              <section className="flex items-center">
                <section
                  className="flex items-center gap-2"
                  onClick={() => setNavIsOpen(!navIsOpen)}
                >
                  <Avatar size="25" round />
                  <p>{user?.username}</p>
                </section>
              </section>
              <section className="flex flex-col gap-y-2">
                <Link to={`/settings`} onClick={() => setNavIsOpen(!navIsOpen)}>
                  <section className="flex items-center gap-3">
                    <BsGear />
                    <p className="font-semibold text-sm">Settings</p>
                  </section>
                </Link>
                <button onClick={LogOut} className="flex items-center gap-3">
                  <FiLogOut />
                  <p className="font-semibold text-sm">Log Out</p>
                </button>
              </section>
            </section>
          </section>
        ) : (
          <section className="bg-white flex flex-col justify-center gap-5 w-full h-full p-5">
            <Link to={`/auth/sign-in`}>
              <button className="border border-secondary rounded-full p-2 w-[100px] text-sm">
                Sign In
              </button>
            </Link>
            <Link to={`/auth/sign-up`}>
              <button className="bg-secondary text-tertiary rounded-full p-2 w-[100px] text-sm">
                Sign Up
              </button>
            </Link>
          </section>
        )}
      </section>
    </header>
  );
}

export default Navbar;
