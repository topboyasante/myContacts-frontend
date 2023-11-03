import { IoIosCall } from "react-icons/io";
import { AiOutlineMail,AiFillEdit } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Avatar from "react-avatar";
import DropDown from "./DropDown";
import { Link } from "react-router-dom";

function ContactCard({ name, phone_number, _id, email }: IContactDetailed) {
  return (
    <div key={_id} className="border col-span-1 p-5 rounded">
      <section className="flex justify-between items-center">
        <section className="flex items-center gap-3 mb-2">
          <Avatar size="40" round name={name} maxInitials={2} />
          <h1>{name}</h1>
        </section>
        <DropDown
          MenuButtonContent={
            <button>
              <BiDotsVerticalRounded />
            </button>
          }
          MenuItemsContent={
            <section className="flex">
              <Link to={`/contacts/edit/${_id}`}>
                <section className="flex items-center gap-3">
                  <AiFillEdit />
                  <p className="font-semibold text-sm">Edit Contact</p>
                </section>
              </Link>
            </section>
          }
        />
      </section>
      <p>{email}</p>
      <p>{phone_number}</p>
      <section className="flex items-center gap-3">
        <a
          href={`tel:${phone_number}`}
          className="bg-secondary rounded-full p-2 my-2"
        >
          <IoIosCall />
        </a>
        <a
          href={`mailto:${email}`}
          className="bg-secondary rounded-full p-2 my-2"
        >
          <AiOutlineMail />
        </a>
      </section>
    </div>
  );
}

export default ContactCard;
