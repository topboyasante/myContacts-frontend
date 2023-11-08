import { useForm } from "react-hook-form";
import useMutationRequest from "../../hooks/useMutationRequest";
import Loader from "../../components/ui/Loader";

function AddContacts() {
  const { AddContact, AddedContactIsPending } = useMutationRequest<IContact>(
    "contacts",
    "contacts"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContact>();

  function onSubmit(data: IContact) {
    AddContact(data);
  }

  return (
    <section className="max-w-screen-xl mx-auto">
      <section className="p-5">
        <section>
          <h1 className="font-semibold text-xl lg:text-3xl xl:text-4xl mb-2">
            Add A Contact
          </h1>
          <p className="text-[#777777]">
            Expand your network effortlessly by adding a new contact to your
            list. Stay connected and grow your relationships with just a few
            clicks - it's that simple.
          </p>
        </section>
        <hr className="my-5" />
        <section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="my-3">
              <label htmlFor="name">Name</label>
              <br />
              <input
                type="text"
                className="border w-full rounded mt-2 px-2 py-1 outline-none appearance-none"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <small className="text-red-600">{errors.name.message}</small>
              )}
            </section>
            <section className="my-3">
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                className="border w-full rounded mt-2 px-2 py-1 outline-none appearance-none"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <small className="text-red-600">{errors.email.message}</small>
              )}
            </section>
            <section className="my-3">
              <label htmlFor="email">Phone Number</label>
              <br />
              <input
                type="text"
                className="border w-full rounded mt-2 px-2 py-1 outline-none appearance-none"
                {...register("phone_number", { required: true })}
              />
              {errors.phone_number && (
                <small className="text-red-600">
                  {errors.phone_number.message}
                </small>
              )}
            </section>

            <button
              className="bg-primary text-white px-4 py-2 rounded"
              disabled={AddedContactIsPending}
              type="submit"
            >
              {AddedContactIsPending ? (
                <Loader height="20" width="20" color="#0C0C1D" />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </section>
      </section>
    </section>
  );
}

export default AddContacts;
