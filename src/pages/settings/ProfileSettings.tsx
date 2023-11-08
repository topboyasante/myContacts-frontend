import { useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import Modal from "../../components/ui/Modal";
import useMutationRequest from "../../hooks/useMutationRequest";
import { useFetchData } from "../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import Loader from "../../components/ui/Loader";

function ProfileSettings() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: user } = useFetchData<IUser>("users/current", "currentUser");
  const { DeleteUser, DeletedUserIsPending } = useMutationRequest<IContact>(
    `users/delete/${user?.id}`,
    "contacts"
  );
  const { EditUserData, EditedUserDataIsPending } =
    useMutationRequest<UpdateUserInput>(`users/${user?.id}`, "currentUser");


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
                <Formik
                  initialValues={{
                    fullname: user?.fullname!,
                    username: user?.username!,
                    email: user?.email!,
                  }}
                  onSubmit={(
                    values: UpdateUserInput,
                    { setSubmitting }: FormikHelpers<UpdateUserInput>
                  ) => {
                    EditUserData(values)
                    setSubmitting(false);
                  }}
                >
                  <Form className="w-full">
                    <section className="my-3">
                      <label htmlFor="fullname">Name</label>
                      <br />
                      <Field
                        id="fullname"
                        name="fullname"
                        type="text"
                        className="border w-full rounded mt-2 px-2 py-1 outline-none appearance-none"
                      />
                    </section>
                    <section className="my-3">
                      <label htmlFor="username">Username</label>
                      <br />
                      <Field
                        id="username"
                        name="username"
                        type="text"
                        className="border w-full rounded mt-2 px-2 py-1 outline-none appearance-none"
                      />
                    </section>
                    <section className="my-3">
                      <label htmlFor="email">Email</label>
                      <br />
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className="border w-full rounded mt-2 px-2 py-1 outline-none appearance-none"
                      />
                    </section>
                    <button
                      type="submit"
                      className="bg-secondary text-tertiary px-2 py-1 rounded"
                      disabled={EditedUserDataIsPending}
                    >
                      {EditedUserDataIsPending ? (
                        <Loader height="20" width="20" color="#0C0C1D" />
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </Form>
                </Formik>
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
