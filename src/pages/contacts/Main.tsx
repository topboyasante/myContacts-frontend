import { useFetchData } from "../../hooks/useFetchData";
import ContactCard from "../../components/ui/ContactCard";

function Main() {
  const { data } = useFetchData<IContactDetailed[]>("contacts", "contacts");
  return (
    <section>
      <section className="max-w-screen-xl mx-auto">
        <section className="p-5">
          <section>
            <h1 className="font-semibold text-xl lg:text-3xl xl:text-4xl mb-2">
              Contacts
            </h1>
            <p className="text-[#777777]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem in
              ea, ut voluptate molestias dolores.
            </p>
          </section>
          <br />
          <section>
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
          </section>
        </section>
      </section>
    </section>
  );
}

export default Main;
