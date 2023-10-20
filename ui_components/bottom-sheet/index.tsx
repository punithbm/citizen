import { Dialog, Transition } from "@headlessui/react";

import React, { FC, Fragment } from "react";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
const BottomSheet: FC<TProps> = (props) => {
  const { isOpen, onClose, children } = props;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20 block" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/[0.6] transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`pointer-events-none fixed inset-x-0 bottom-0 flex max-w-full justify-center`}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300 "
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transform transition ease-in-out duration-300 "
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <Dialog.Panel
                  className={`pointer-events-auto w-full max-w-[420px]  bg-[#f5f5f5] rounded-t-3xl dark:bg-neutralDark-50`}
                >
                  <div className="w-full">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default BottomSheet;
