import { useFetchData } from "../../hooks/useFetchData";
import ContactCard from "../../components/ui/ContactCard";
import Loader from "../../components/ui/Loader";
import { IoIosPersonAdd } from "react-icons/io";
import { Link } from "react-router-dom";

function Main() {
  const { data, isLoading, isError } = useFetchData<IContactDetailed[]>(
    "contacts",
    "contacts"
  );
  return (
    <section>
      <section className="max-w-screen-xl mx-auto">
        <section className="p-5">
          <section>
            <h1 className="font-semibold text-xl lg:text-3xl xl:text-4xl mb-2">
              Contacts
            </h1>
            <p className="text-[#777777]">
              View all your contacts. Send them a Mail, or Call them!
            </p>
          </section>
          <br />
          <section>
            {isLoading && (
              <section className="w-full h-full flex justify-center items-center">
                <Loader height="50" width="50" color="#0C0C1D" />
              </section>
            )}
            {data && (
              <section>
                {data.length > 0 ? (
                  <section className="grid lg:grid-cols-3 gap-5">
                    {data.map((item) => {
                      return (
                        <ContactCard
                          key={item._id}
                          name={item.name}
                          phone_number={item.phone_number}
                          email={item.email}
                          _id={item._id}
                        />
                      );
                    })}
                  </section>
                ) : (
                  <h1>No Contacts have been added.</h1>
                )}
              </section>
            )}
            {isError && (
              <p className="text-center text-xl">
                Unfortunately, there was an error. Not to fret! Reload the page!
              </p>
            )}
          </section>
        </section>
      </section>

      <Link to={`/contacts/add`}>
        <div className="hidden lg:block fixed bottom-5 right-0 m-8 bg-secondary rounded-full p-3 my-2">
          <IoIosPersonAdd size={30} />
        </div>
      </Link>
    </section>
  );
}

export default Main;
