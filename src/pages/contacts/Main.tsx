import { useFetchData } from "../../hooks/useFetchData";
import ContactCard from "../../components/ui/ContactCard";
import Loader from "../../components/ui/Loader";
import { IoIosPersonAdd } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";

function Main() {
  const accessToken = Cookies.get("accessToken");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchIsLoading, setSearchIsLoading] = useState<boolean>(false);
  const { data, isLoading, isError } = useFetchData<IContactDetailed[]>(
    "contacts",
    "contacts"
  );

  async function search() {
    setSearchIsLoading(true);
    await axios
      .post(
        `https://mycontacts-backend-fjb8.onrender.com/api/contacts/${searchQuery}`,
        searchQuery,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        console.log(res.data);
        setSearchIsLoading(false);
      })
      .catch((err) => {
        setSearchIsLoading(false);
        toast.error(`${err.response.data.message}`);
      });
  }

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
          <section className="flex justify-between gap-3 w-full mt-3">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a contact"
              className="border rounded w-[70%] lg:w-[90%] px-2 py-1 outline-none appearance-none"
            />
            <button
              onClick={search}
              disabled={searchIsLoading}
              className="bg-secondary w-[30%] lg:w-[8%] flex justify-center items-center rounded disabled:bg-gray-300  disabled:text-white ease-in duration-300 disabled:cursor-not-allowed"
            >
              {searchIsLoading ? (
                <Loader height="20" width="20" color="#0C0C1D" />
              ) : (
                <AiOutlineSearch />
              )}
            </button>
          </section>
          <hr className="my-5" />
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
        <div className="fixed bottom-5 right-0 m-8 bg-secondary rounded-full p-3 my-2">
          <IoIosPersonAdd size={30} />
        </div>
      </Link>
    </section>
  );
}

export default Main;
