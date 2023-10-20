import Image from "next/image";

import { useContext } from "react";

import { GlobalContext } from "../../context/GlobalContext";

import { icons } from "../../utils/images";

import BackBtn from "../BackBtn";
import { useRouter } from "next/navigation";

interface IHeader {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  step: number;
  handleSteps?: (step: number) => void;
}

const Header = (props: IHeader) => {
  const { step, signIn, signOut, handleSteps } = props;

  const {
    state: { isConnected },
  } = useContext(GlobalContext);

  const router = useRouter();

  return (
    <header className="z-[9] fixed left-1/2 -translate-x-1/2 top-4 rounded-3xl h-[64px] bg-secondary-100 text-center flex items-center justify-between px-3 w-[calc(100vw-32px)] lg:w-[600px]">
      {step === 1 || step === 2 ? (
        <Image src={icons.logo} alt="logo" className="w-10" />
      ) : (
        <>
          <BackBtn
            onClick={() => {
              step === 3 ? handleSteps?.(2) : router.back();
            }}
          />
        </>
      )}

      <div className="flex gap-4 items-center">
        <div className="relative">
          {isConnected ? (
            <button
              type="button"
              onClick={signOut}
              className="h-[40px] rounded-3xl bg-secondary-600 flex items-center px-3 py-2 justify-center gap-2"
            >
              <Image src={icons.logOut} alt="logout" className="w-6" />
            </button>
          ) : (
            <button
              type="button"
              onClick={signIn}
              className="h-[40px] rounded-3xl bg-secondary-600 flex items-center px-3 py-2 justify-center gap-2"
            >
              <Image src={icons.googleIcon} alt="login" className="w-6" />
              <p className="supportText_medium text-white">Login</p>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
