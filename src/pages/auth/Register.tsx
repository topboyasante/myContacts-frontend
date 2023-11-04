import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Loader from "../../components/ui/Loader";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterUserInput>();

  function onSubmit(data: RegisterUserInput) {
    setLoading(true);
    axios
      .post(
        "https://mycontacts-backend-fjb8.onrender.com/api/users/register",
        data
      )
      .then(() => {
        toast.success("User Created!");
        setLoading(false);
        reset();
        navigate("/auth/sign-in");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(`${err.response.data.message}`);
      });
  }

  return (
    <section className="w-full lg:h-screen bg-white">
      <section className="w-full h-full flex items-center">
        {/* Left Side */}
        <section className="hidden lg:block w-full h-full lg:w-[25%] bg-secondary text-white">
          <section className="auth-style-top bg-tertiary h-[100%] p-5">
            <Link to={`/`}>
              <p className="font-semibold text-2xl">
                My<span className="text-secondary">Contacts</span>
              </p>
            </Link>
          </section>
        </section>
        {/* Right Side */}
        <section className="w-full lg:w-[75%] h-full lg:h-auto p-5">
          <section className="max-w-[95%] lg:max-w-[50%] mx-auto">
            <Link to={`/`}>
              <p className="lg:hidden font-semibold text-xl">
                My<span className="text-primary">Contacts</span>
              </p>
            </Link>
            <br />
            {/* Heading */}
            <section className="w-full">
              <h1 className="font-semibold text-2xl">
                Welcome to MyContacts 👋
              </h1>
              <p className="text-[#777777]">Create your account</p>
            </section>
            <br />
            {/* Form */}
            <section className="w-full">
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <section>
                  <label htmlFor="fullname" className="font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your fullname"
                    className="border border-[#9EA1AB] bg-transparent outline-none appearance-none w-full rounded px-4 py-2 lg:px-2 lg:py-1"
                    {...register("fullname", { required: true })}
                  />
                  {errors.fullname && (
                    <small className="text-red-700">Error</small>
                  )}
                </section>
                <br />
                <section>
                  <label htmlFor="username" className="font-semibold">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="border border-[#9EA1AB] bg-transparent outline-none appearance-none w-full rounded px-4 py-2 lg:px-2 lg:py-1"
                    {...register("username", { required: true })}
                  />
                  {errors.username && (
                    <small className="text-red-700">Error</small>
                  )}
                </section>
                <br />
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
                        <div onClick={() => setShowPassword(!showPassword)}>
                          <AiOutlineEyeInvisible />
                        </div>
                      ) : (
                        <div onClick={() => setShowPassword(!showPassword)}>
                          <AiOutlineEye />
                        </div>
                      )}
                    </section>
                  </section>
                  {errors.password && (
                    <small className="text-red-700">Error</small>
                  )}
                </section>
                <br />
                <section>
                  <label htmlFor="confirm_password" className="font-semibold">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className="border border-[#9EA1AB] bg-transparent outline-none appearance-none w-full rounded px-4 py-2 lg:px-2 lg:py-1"
                    {...register("confirm_password", { required: true })}
                  />
                  {errors.confirm_password && (
                    <small className="text-red-700">Error</small>
                  )}
                </section>
                <br />
                <button
                  type="submit"
                  className="flex justify-center items-center bg-secondary rounded-full p-2 w-[100px] text-sm disabled:bg-gray-500  disabled:text-white ease-in duration-300 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader height="20" width="20" color="#0C0C1D" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>
            </section>
            {/* Sign Up Link */}
            <section className="mt-4">
              <p>
                Already have an account?{" "}
                <span className="text-tertiary font-semibold">
                  <Link to={`/auth/sign-in`}>Sign In</Link>
                </span>
              </p>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}

export default Register;
