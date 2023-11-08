import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import useMutationRequest from "../../hooks/useMutationRequest";
import useFetchData from "../../hooks/useFetchData";

function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const { UserDetails: user } = useFetchData<IUser>("users/current", "currentUser");
  const { register, handleSubmit } = useForm<ChangePasswordInput>();
  const { UpdatePassword } = useMutationRequest<ChangePasswordInput>(
    `users/password/${user?.id}`,
    "contacts"
  );

  function onSubmit(data: ChangePasswordInput) {
    UpdatePassword(data);
  }

  return (
    <section>
      <section className="max-w-screen-xl mx-auto">
        <section className="p-5">
          <section>
            <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-2">
              Change Password
            </h1>
            <p className="text-[#777777]">Change your Password</p>
          </section>
          <hr className="my-5" />
          <section>
            <form onSubmit={handleSubmit(onSubmit)}>
              <section>
                <label htmlFor="password" className="font-semibold">
                  Old Password
                </label>
                <section className="flex items-center border border-[#9EA1AB] bg-transparent  w-full rounded px-4 py-2 lg:px-2 lg:py-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your old password"
                    className="w-full outline-none appearance-none"
                    {...register("prev_password", { required: true })}
                  />
                </section>
              </section>
              <br />
              <section>
                <label htmlFor="password" className="font-semibold">
                  New Password
                </label>
                <section className="flex items-center border border-[#9EA1AB] bg-transparent  w-full rounded px-4 py-2 lg:px-2 lg:py-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    className="w-[95%] outline-none appearance-none"
                    {...register("new_password", { required: true })}
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
              </section>
              <br />
              <section>
                <label htmlFor="password" className="font-semibold">
                  Confirm Password
                </label>
                <section className="flex items-center border border-[#9EA1AB] bg-transparent  w-full rounded px-4 py-2 lg:px-2 lg:py-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    className="w-full outline-none appearance-none"
                    {...register("confirm_password", { required: true })}
                  />
                </section>
              </section>
              <br />
              <button className="bg-secondary text-tertiary px-2 py-1 rounded">
                Save Changes
              </button>
            </form>
          </section>
        </section>
      </section>
    </section>
  );
}

export default ChangePassword;
