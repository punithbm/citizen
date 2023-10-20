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
  const { walletAddress, signIn, step, handleSteps, onHamburgerClick, signOut, setWalletAddress } = props;
  const {
    dispatch,
    state: { address, isConnected, loggedInVia },
  } = useContext(GlobalContext);
  const [copyText, setCopyText] = useState("Copy Address");
  const [open, setOpen] = useState(false);
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
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(!open);
    onHamburgerClick();
  };

  const handleClickOutside = (e: any) => {
    if (menuRef.current && !menuRef?.current?.contains(e.target)) {
      setOpen(false);
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
    <header className="z-[9] fixed left-1/2 -translate-x-1/2 top-4  rounded-3xl h-[64px] bg-secondary-100 text-center flex items-center justify-between px-3 w-[calc(100vw-32px)] lg:w-[600px]">
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
            onClick={handleClick}
            className="min-w-[134px] h-[40px] rounded-2xl bg-white flex items-center p-2 justify-center gap-[12px]"
          >
            <Image src={icons.ethLogo} alt="more options" className="w-6 " />
            <p className="supportText_medium">{trimAddress(walletAddress)}</p>
            <Image src={icons.chevronDown} alt="more" className="w-6 " />
          </button>
          {open ? (
            <div className="absolute top-12 bg-white shadow-sm rounded-lg hidden lg:block min-w-[280px]">
              {address ? (
                <>
                  <div className="flex justify-between items-center px-4 py-3 border-b border-secondary-300">
                    <div>
                      <p className="text-[12px] font-medium text-[#555555]">ACCOUNT OVERVIEW</p>
                      <p className="text-black text-left">{address ? trimAddress(address) : ""}</p>
                    </div>
                  </div>
                  <div
                    className="flex justify-between items-center px-4 py-3 cursor-pointer border-b border-secondary-300 hover:bg-secondary-300"
                    role="presentation"
                    onClick={copyToClipBoard}
                  >
                    <p className="text-black">{copyText}</p>
                    <Image src={icons.copyBlack} alt="copy icon" />
                  </div>
                  {isConnected && loggedInVia === LOGGED_IN.EXTERNAL_WALLET && (
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

              {isConnected && loggedInVia === LOGGED_IN.GOOGLE ? (
                <div
                  className="flex justify-between items-center py-3 px-4 cursor-pointer hover:bg-secondary-300"
                  role="presentation"
                  onClick={handleLogout}
                >
                  <div className="flex gap-2 items-center">
                    <Image src={icons.googleIcon} alt="login with google" />
                    <p className="text-black">Logout</p>
                  </div>
                  <Image src={icons.logoutIcon} alt="logout" />
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};
export default Header;
