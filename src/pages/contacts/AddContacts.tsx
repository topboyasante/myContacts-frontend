import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useMutationRequest from "../../hooks/useMutationRequest";

function AddContacts() {
    const navigate = useNavigate();
    const { mutate: AddContact, isPending } = useMutationRequest<IContact>("contacts","contacts");
  
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<IContact>();
  
    function onSubmit(data: IContact) {
      try {
        AddContact(data);
        toast.success("Contact Added!");
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
          Add A Contact
        </h1>
        <p className="text-[#777777]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem in
          ea, ut voluptate molestias dolores.
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
              <small className="text-red-600">{errors.phone_number.message}</small>
            )}
          </section>
         
          <button
            className="bg-primary text-white px-4 py-2 rounded"
            disabled={isPending}
            type="submit"
          >
            {isPending ? <h1>Loading</h1> : "Submit"}
          </button>
        </form>
      </section>
    </section>
  </section>
  )
}

export default AddContacts