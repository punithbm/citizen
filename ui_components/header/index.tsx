import Image from "next/image";
import * as React from "react";
import { useContext } from "react";

import { GlobalContext } from "../../context/GlobalContext";

import { icons } from "../../utils/images";

import BackBtn from "../BackBtn";

interface IHeader {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  step: number;
}

const Header = (props: IHeader) => {
  const { step, signIn, signOut } = props;
  const {
    dispatch,
    state: { isConnected },
  } = useContext(GlobalContext);

  return (
    <header className="z-[9] fixed left-1/2 -translate-x-1/2 top-4  rounded-3xl h-[64px] bg-secondary-100 text-center flex items-center justify-between px-3 w-[calc(100vw-32px)] lg:w-[600px]">
      {step === 1 ? (
        <Image src={icons.logo} alt="logo" className="w-10" />
      ) : (
        // <BackBtn onClick={() => handleSteps(step === 3 ? 1 : step - 1)} />
        <Image src={icons.logo} alt="logo" className="w-10" />
      )}

      <div className="flex gap-4 items-center">
        <div className="relative">
          {isConnected ? (
            <button
              type="button"
              onClick={signOut}
              className="h-[40px] rounded-2xl bg-white flex items-center px-3 py-2 justify-center gap-2"
            >
              <Image src={icons.logOut} alt="more options" className="w-6 " />
              <p className="supportText_medium text-text-900">Log out</p>
            </button>
          ) : (
            <button
              type="button"
              onClick={signIn}
              className="h-[40px] rounded-2xl bg-white flex items-center px-3 py-2 justify-center gap-2"
            >
              <Image
                src={icons.googleIcon}
                alt="more options"
                className="w-6 "
              />
              <p className="supportText_medium text-text-900">Login</p>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
