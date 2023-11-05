import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../components/ui/Modal";
import useMutationRequest from "../../hooks/useMutationRequest";
import { useFetchData } from "../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Avatar from "react-avatar";

function ProfileSettings() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: user } = useFetchData<IUser>("users/current", "currentUser");
  const { DeleteData, DeletedPending } = useMutationRequest<IContact>(
    `users/delete/${user?.id}`,
    "contacts"
  );

  function deleteData() {
    DeleteData();
    Cookies.remove("accessToken");
    navigate("/auth/sign-in");
    toast.success("Account Deleted!");
    setIsOpen(false);
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
                <form className="w-full">
                  <section className="my-3">
                    <label htmlFor="name">Name</label>
                    <br />
                    <input
                      type="text"
                      defaultValue={user?.fullname}
                      className="border w-full rounded mt-2 px-2 py-1 outline-none appearance-none"
                    />
                  </section>
                  <section className="my-3">
                    <label htmlFor="name">Username</label>
                    <br />
                    <input
                      type="text"
                      defaultValue={user?.username}
                      className="border w-full rounded mt-2 px-2 py-1 outline-none appearance-none"
                    />
                  </section>
                  <section className="my-3">
                    <label htmlFor="name">Email</label>
                    <br />
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="border w-full rounded mt-2 px-2 py-1 outline-none appearance-none"
                    />
                  </section>
                </form>
              </section>
            </section>
            <section className="flex gap-5">
              <button className="bg-secondary text-tertiary px-2 py-1 rounded">
                Save Changes
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className="bg-red-900 text-white px-2 py-1 rounded"
              >
                Delete Account
              </button>
            </section>
          </section>
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
                disabled={DeletedPending}
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
