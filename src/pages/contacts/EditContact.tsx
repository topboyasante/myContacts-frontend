import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import useMutationRequest from "../../hooks/useMutationRequest";
import Loader from "../../components/ui/Loader";

function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: contact, isLoading } = useFetchData<IContactDetailed>(
    `contacts/${id}`,
    "contacts"
  );
  const { UpdateData, UpdatedPending } = useMutationRequest<IContact>(
    `contacts/${id}`,
    "contacts"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IContact>();

  function onSubmit(data: IContact) {
    try {
      UpdateData(data);
      toast.success("Contact Updated!");
      reset();
      navigate("/contacts");
    } catch (error) {
      toast.error("There was an error.");
    }
  }

  return (
    <section className="max-w-screen-xl mx-auto">
      <section className="p-5">
        <section>
          <h1 className="font-semibold text-xl lg:text-3xl xl:text-4xl mb-2">
            Edit Contact
          </h1>
          <p className="text-[#777777]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem in
            ea, ut voluptate molestias dolores.
          </p>
        </section>
        <hr className="my-5" />
        <section>
          {isLoading && <Loader height="50" width="50" color="#0C0C1D" />}
          {contact && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <section className="my-3">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  defaultValue={contact?.name}
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
                  defaultValue={contact?.email}
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
                  defaultValue={contact?.phone_number}
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
                disabled={UpdatedPending}
                type="submit"
              >
                {UpdatedPending ? <h1>Loading</h1> : "Submit"}
              </button>
            </form>
          )}
        </section>
      </section>
    </section>
  );
}

export default EditContact;
