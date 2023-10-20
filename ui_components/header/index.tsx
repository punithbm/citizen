import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useContext, useEffect, useRef, useState } from "react";

import { ACTIONS, GlobalContext } from "../../context/GlobalContext";
import { ESTEPS, LOGGED_IN } from "../../pages";
import { trimAddress } from "../../utils";
import { icons } from "../../utils/images";
import { useWagmi } from "../../utils/wagmi/WagmiContext";
import BackBtn from "../BackBtn";

interface IHeader {
  walletAddress: string;
  signIn: () => Promise<void>;
  handleSteps: (step: number) => void;
  step: number;
  onHamburgerClick: () => void;
  signOut: () => Promise<void>;
  setWalletAddress: (val: string) => void;
  loader?: boolean;
  initLoader?: boolean;
}

const Header = (props: IHeader) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const {
    walletAddress,
    signIn,
    step,
    handleSteps,
    onHamburgerClick,
    signOut,
    setWalletAddress,
  } = props;
  const {
    dispatch,
    state: { googleUserInfo, address, isConnected, loggedInVia },
  } = useContext(GlobalContext);
  const [copyText, setCopyText] = useState("Copy Address");
  const [opacity, setOpacity] = useState(false);
  const { disconnect } = useWagmi();

  const copyToClipBoard = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(address);
    setCopyText("Address copied");
    setTimeout(() => {
      setCopyText("Copy Address");
    }, 4000);
  };

  const handleLogout = () => {
    signOut();
    setOpacity(false);
  };

  const handleClick = () => {
    setOpacity(!opacity);
    onHamburgerClick();
  };

  const handleClickOutside = (e: any) => {
    if (menuRef.current && !menuRef?.current?.contains(e.target)) {
      setOpacity(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleDisConnect = async () => {
    await disconnect();
    localStorage.removeItem("isGoogleLogin");
    localStorage.removeItem("isConnected");
    handleSteps(ESTEPS.ONE);
    setWalletAddress("");
    dispatch({
      type: ACTIONS.LOGOUT,
      payload: "",
    });
    dispatch({
      type: ACTIONS.LOGGED_IN_VIA,
      payload: "",
    });
    dispatch({
      type: ACTIONS.SET_ADDRESS,
      payload: "",
    });
  };

  return (
    <header className="z-[9] fixed left-1/2 -translate-x-1/2 top-4 w-[calc(100vw-32px)] rounded-3xl h-[64px] bg-secondary-100 text-center flex items-center justify-between px-3">
      {step === 1 ? (
        <Image src={icons.logo} alt="logo" className="w-10" />
      ) : (
        // <BackBtn onClick={() => handleSteps(step === 3 ? 1 : step - 1)} />
        <Image src={icons.logo} alt="logo" className="w-10" />
      )}

      <div className="flex gap-4 items-center">
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            className="min-w-[134px] h-[40px] rounded-2xl bg-white flex items-center p-2 justify-center gap-[12px]"
          >
            <Image
              src={icons.ethLogo}
              alt="more options"
              className="w-6 "
              onClick={handleClick}
            />
            <p className="supportText_medium">...0xbc6</p>
            <Image
              src={icons.chevronDown}
              alt="more"
              className="w-6 "
              onClick={handleClick}
            />

            {opacity ? (
              <div className="absolute top-12 bg-[#f5f5f5] rounded-lg hidden lg:block">
                <div className="min-w-[280px]">
                  {address ? (
                    <>
                      <div className="flex justify-between items-center px-4 py-3">
                        <div>
                          <p className="text-[12px] font-medium text-[#555555]">
                            ACCOUNT OVERVIEW
                          </p>
                          <p className="text-black text-left">
                            {address ? trimAddress(address) : ""}
                          </p>
                        </div>
                      </div>
                      <div
                        className="w-[95%] h-[52px] bg-white rounded-lg mx-auto flex justify-between items-center px-4 mb-6 cursor-pointer"
                        role="presentation"
                        onClick={copyToClipBoard}
                      >
                        <p className="text-black">{copyText}</p>
                        <Image src={icons.copyBlack} alt="copy icon" />
                      </div>
                      {isConnected &&
                        loggedInVia === LOGGED_IN.EXTERNAL_WALLET && (
                          <div
                            className="w-[95%] h-[52px] bg-white rounded-lg mx-auto flex justify-between items-center px-4 mb-6"
                            role="presentation"
                            onClick={() => {
                              handleDisConnect();
                            }}
                          >
                            <p className="text-[#E11900]">Disconnect Wallet</p>
                          </div>
                        )}
                    </>
                  ) : null}

                  <div className="bg-white w-full px-4">
                    {!isConnected ? (
                      <div
                        className="flex justify-between items-center py-6 border-b-2 cursor-pointer"
                        role="presentation"
                        onClick={signIn}
                      >
                        <div className="flex gap-2 items-center">
                          <Image
                            src={icons.googleIcon}
                            alt="login with google"
                          />
                          <p className="text-black">Login with Google</p>
                        </div>
                        <Image
                          src={icons.chevronRight}
                          alt="login with google"
                        />
                      </div>
                    ) : null}

                    <Link
                      href="mailto:contact@blocktheory.com"
                      target="_blank"
                      onClick={() => {
                        setOpacity(false);
                      }}
                    >
                      <div className="flex justify-between items-center py-6 border-b-2">
                        <div className="flex gap-2 items-center">
                          <Image src={icons.helpIcon} alt="help" />
                          <p className="text-black">Help</p>
                        </div>
                        <Image
                          src={icons.chevronRight}
                          alt="login with google"
                        />
                      </div>
                    </Link>
                    {isConnected && loggedInVia === LOGGED_IN.GOOGLE ? (
                      <div
                        className="flex justify-between items-center py-6 cursor-pointer"
                        role="presentation"
                        onClick={handleLogout}
                      >
                        <div className="flex gap-2 items-center">
                          <Image
                            src={icons.googleIcon}
                            alt="login with google"
                          />
                          <p className="text-black">Logout</p>
                        </div>
                        <Image src={icons.logoutIcon} alt="logout" />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
