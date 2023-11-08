import { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal";
import useMutationRequest from "../../hooks/useMutationRequest";
import Avatar from "react-avatar";
import { useForm } from "react-hook-form";
import Loader from "../../components/ui/Loader";
import useFetchData from "../../hooks/useFetchData";

function ProfileSettings() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { UpdatedUserDetails: user, isFetchingUserToUpdateDetails } =
    useFetchData<IUser>("users/current", "currentUser");
  const { DeleteUser, DeletedUserIsPending } = useMutationRequest<IContact>(
    `users/delete/${user?.id}`,
    "contacts"
  );

  const { EditUserData, EditedUserDataIsPending } =
    useMutationRequest<UpdateUserInput>(`users/${user?.id}`, "currentUser");

  const defaultFormValues: UpdateUserInput = {
    fullname: user?.fullname ?? "",
    email: user?.email ?? "",
    username: user?.username ?? "",
  };

  const { register, handleSubmit, reset } = useForm<UpdateUserInput>({
    defaultValues: defaultFormValues,
  });

  //Update the form's default values with the data from the API
  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user]);

  //Edit User Data
  function onSubmit(data: UpdateUserInput) {
    EditUserData(data);
  }

  function deleteData() {
    DeleteUser();
  }

  return (
    <section>
      <section className="max-w-screen-xl mx-auto">
        <section className="p-5">
          <section>
            <h1 className="font-semibold text-xl lg:text-3xl xl:text-4xl mb-2">
              Profile
            </h1>
            <p className="text-[#777777]">Configure your profile</p>
          </section>
          <hr className="my-5" />
          {isFetchingUserToUpdateDetails ? (
            <section className="w-full h-full flex justify-center items-center">
              <Loader height="50" width="50" color="#0C0C1D" />
            </section>
          ) : (
            <section>
              <section className="flex flex-col md:flex-row mb-8 justify-between gap-5 w-full">
                {/* Left Side */}
                <Avatar
                  name={user?.fullname}
                  round
                  maxInitials={2}
                  className="w-[15%]"
                  size="150"
                />
                {/* Right Side */}
                <section className="md:w-[85%]">
                  <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <section className="my-3">
                      <label htmlFor="name">Name</label>
                      <br />
                      <input
                        type="text"
                        className="border w-full rounded mt-2 px-2 py-1 outline-none appearance-none"
                        {...register("fullname")}
                      />
                    </section>
                    <section className="my-3">
                      <label htmlFor="name">Username</label>
                      <br />
                      <input
                        type="text"
                        className="border w-full rounded mt-2 px-2 py-1 outline-none appearance-none"
                        {...register("username")}
                      />
                    </section>
                    <section className="my-3">
                      <label htmlFor="name">Email</label>
                      <br />
                      <input
                        type="email"
                        className="border w-full rounded mt-2 px-2 py-1 outline-none appearance-none"
                        {...register("email")}
                      />
                    </section>
                    <button
                      className="bg-secondary text-tertiary px-2 py-1 rounded"
                      disabled={EditedUserDataIsPending}
                    >
                      {EditedUserDataIsPending ? (
                        <Loader height="20" width="20" color="#0C0C1D" />
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </form>
                </section>
              </section>
              <section className="flex gap-5">
                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-red-900 text-white px-2 py-1 rounded"
                >
                  Delete Account
                </button>
              </section>
            </section>
          )}
        </section>
      </section>
      <Modal
        CloseModal={() => setIsOpen(false)}
        ModalIsOpen={isOpen}
        ModalTitle="Delete Account"
        ModalContent={
          <section>
            <h1>Are you sure you want to delete your account?</h1>
            <div className="flex gap-5 mt-3">
              <button
                onClick={deleteData}
                disabled={DeletedUserIsPending}
                className="bg-red-700 text-white px-3 py-1 rounded"
              >
                Yes
              </button>
              <button onClick={() => setIsOpen(false)}>No</button>
            </div>
          </section>
        }
      />
    </section>
  );
}

export default ProfileSettings;
