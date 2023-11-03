import { Disclosure, Transition } from "@headlessui/react";
import { ReactNode } from "react";

type DisclosureProps = {
  DisclosureButton: ReactNode;
  DisclosurePanel: ReactNode;
};

function DisclosureComponent({
  DisclosureButton,
  DisclosurePanel,
}: DisclosureProps) {
  return (
    <Disclosure>
      <Disclosure.Button>{DisclosureButton}</Disclosure.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Disclosure.Panel>{DisclosurePanel}</Disclosure.Panel>
      </Transition>
    </Disclosure>
  );
}

export default DisclosureComponent;