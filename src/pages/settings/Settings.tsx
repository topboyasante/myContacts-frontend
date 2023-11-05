import { CgProfile } from "react-icons/cg";
import { MdOutlineSecurity } from "react-icons/md";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";

function Settings() {
  return (
    <section className="max-w-screen-xl mx-auto">
      <section className="p-5">
        <section>
          <h1 className="font-semibold text-xl lg:text-3xl xl:text-4xl mb-2">
            Settings
          </h1>
          <p className="text-[#777777]">Configure MyContacts</p>
        </section>
        <br />
        <section className="flex flex-col gap-5">
          <Link to={`/settings/profile`}>
            <div className="border p-5 rounded flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <CgProfile />
                <p className="text-lg">Profile</p>
              </div>
              <BsChevronRight />
            </div>
          </Link>
          <Link to={`/settings/security`}>
            <div className="border p-5 rounded flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <MdOutlineSecurity />
                <p className="text-lg">Security</p>
              </div>
              <BsChevronRight />
            </div>
          </Link>
        </section>
      </section>
    </section>
  );
}

export default Settings;
