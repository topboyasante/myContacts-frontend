import { BsChevronRight } from "react-icons/bs";
import { MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";

function SecuritySettings() {
  return (
    <section className="max-w-screen-xl mx-auto">
      <section className="p-5">
        <section>
          <h1 className="font-semibold text-xl lg:text-3xl xl:text-4xl mb-2">
            Security
          </h1>
          <p className="text-[#777777]">Change your Security Settings</p>
        </section>
        <br />
        <section className="flex flex-col gap-5">
          <Link to={`/settings/security/change-password`}>
            <div className="border p-5 rounded flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <MdPassword />
                <p className="text-lg">Change Password</p>
              </div>
              <BsChevronRight />
            </div>
          </Link>
        </section>
      </section>
    </section>
  );
}

export default SecuritySettings;
