import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import useMutationRequest from "../../hooks/useMutationRequest";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const {
  //   mutate: LoginUser,
  //   isPending,
  //   data: LoginData,
  //   isSuccess,
  // } = useMutationRequest("users/login");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginUserInput>();

  async function onSubmit(data: LoginUserInput) {
    await axios
      .post("https://mycontacts-backend-fjb8.onrender.com/api/users/login", data)
      .then((res) => {
        console.log(res.data)
        Cookies.set("accessToken", res.data.accessToken, {
          expires: 30,
          secure: true,
        });
        toast.success("Logged in! Redirecting you to the homepage");
        reset();
        setTimeout(() => {
          navigate("/contacts");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("There was an error.");
      });
  }
  return (
    <section className="w-full h-screen bg-white">
      <section className="w-full h-full flex items-center">
        {/* Left Side */}
        <section className="hidden lg:block w-full h-full lg:w-[25%] bg-tertiary text-white p-5">
          <Link to={`/`}>
            <p className="font-semibold text-2xl">
              My<span className="text-secondary">Contacts</span>
            </p>
          </Link>
        </section>
        {/* Right Side */}
        <section className="w-full lg:w-[75%] p-5">
          <section className="max-w-[95%] lg:max-w-[50%] mx-auto">
            {/* Heading */}
            <section className="w-full">
              <h1 className="font-semibold text-2xl">
                Welcome to MyContacts 👋
              </h1>
              <p className="text-[#777777]">Log into your account</p>
            </section>
            <br />
            {/* Form */}
            <section className="w-full">
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <section>
                  <label htmlFor="email" className="font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="border border-[#9EA1AB] bg-transparent outline-none appearance-none w-full rounded px-4 py-2 lg:px-2 lg:py-1"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <small className="text-red-700">Error</small>
                  )}
                </section>
                <br />
                <section>
                  <label htmlFor="password" className="font-semibold">
                    Password
                  </label>
                  <section className="flex items-center border border-[#9EA1AB] bg-transparent  w-full rounded px-4 py-2 lg:px-2 lg:py-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-[95%] outline-none appearance-none"
                      {...register("password", { required: true })}
                    />
                    <section className="w-[5%] flex justify-center items-center">
                      {showPassword ? (
                        <button onClick={() => setShowPassword(!showPassword)}>
                          <AiOutlineEyeInvisible />
                        </button>
                      ) : (
                        <button onClick={() => setShowPassword(!showPassword)}>
                          <AiOutlineEye />
                        </button>
                      )}
                    </section>
                  </section>
                  {errors.password && (
                    <small className="text-red-700">Error</small>
                  )}
                </section>
                <br />
                <button
                  className="bg-secondary rounded-full p-2 w-[100px] text-sm disabled:bg-gray-500  disabled:text-white ease-in duration-300 disabled:cursor-not-allowed"
                  // disabled={isPending}
                >
                  Sign In
                </button>
              </form>
            </section>
            {/* Sign Up Link */}
            <section className="mt-4">
              <p>
                Don't have an account?{" "}
                <span className="text-tertiary font-semibold">
                  <Link to={`/auth/sign-up`}>Sign Up</Link>
                </span>
              </p>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}

export default Login;