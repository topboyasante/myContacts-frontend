import { IoIosCall } from "react-icons/io";
import { AiOutlineMail, AiFillEdit } from "react-icons/ai";
import { BiDotsVerticalRounded, BiTrash } from "react-icons/bi";
import Avatar from "react-avatar";
import DropDown from "./DropDown";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";
import useMutationRequest from "../../hooks/useMutationRequest";

function ContactCard({ name, phone_number, _id, email }: IContactDetailed) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { DeleteContact, DeletedContactIsPending } =
    useMutationRequest<IContact>(`contacts/${_id}`, "contacts");

  function deleteData() {
    DeleteContact();
    setIsOpen(DeletedContactIsPending);
  }

  return (
    <section>
      {/* Card */}
      <div key={_id} className="border col-span-1 p-5 rounded">
        <section className="flex justify-between items-center">
          <section className="flex items-center gap-3 mb-2">
            <Avatar size="40" round name={name} maxInitials={2} />
            <h1>{name}</h1>
          </section>
          <DropDown
            MenuButtonContent={<BiDotsVerticalRounded />}
            MenuItemsContent={
              <section className="flex flex-col gap-3">
                <Link to={`/contacts/edit/${_id}`}>
                  <section className="flex items-center gap-3">
                    <AiFillEdit />
                    <p className="font-semibold text-sm">Edit Contact</p>
                  </section>
                </Link>
                <button
                  onClick={() => setIsOpen(true)}
                  className="flex items-center gap-3"
                >
                  <BiTrash />
                  <p className="font-semibold text-sm">Delete Contact</p>
                </button>
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
      <Modal
        CloseModal={() => setIsOpen(false)}
        ModalIsOpen={isOpen}
        ModalTitle="Delete Contact"
        ModalContent={
          <section>
            <h1>Are you sure you want to delete this contact?</h1>
            <div className="flex gap-5 mt-3">
              <button
                onClick={deleteData}
                disabled={DeletedContactIsPending}
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

export default ContactCard;
