import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { createSafe } from "@instadapp/avocado";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { serializeError } from "eth-rpc-errors";
import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

import {
  oauthClientId,
  productName,
  web3AuthClientId,
  web3AuthLoginType,
  web3AuthVerifier,
} from "../constants";
import { ACTIONS, GlobalContext } from "../context/GlobalContext";
import BottomSheet from "../ui_components/bottom-sheet";
import ConnectWallet from "../ui_components/connect_wallet/";
import Footer from "../ui_components/footer";
import Header from "../ui_components/header";
import HomePage from "../ui_components/home/HomePage";

import { BaseGoerli } from "../utils/chain/baseGoerli";
import { useWagmi } from "../utils/wagmi/WagmiContext";
import Login from "../ui_components/login/Login";
import { usePathname } from "next/navigation";

export type THandleStep = {
  handleSteps: (step: number) => void;
};

export enum ESTEPS {
  ONE = 1,
  TWO = 2,
  THREE = 3,
}
export enum LOGGED_IN {
  GOOGLE = "google",
  EXTERNAL_WALLET = "external_wallet",
}

export default function Home() {
  const {
    dispatch,
    state: { isConnected },
  } = useContext(GlobalContext);
  const pathname = usePathname();
  const [loader, setLoader] = useState(false);
  const [initLoader, setInitLoader] = useState(false);
  const { openConnectModal } = useConnectModal();

  const [openLogin, setSdk] = useState<any>("");
  const [safeLogin, setSafeLogin] = useState<any>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const { getAccount, disconnect } = useWagmi();
  const { address, isConnecting } = useAccount();
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  useEffect(() => {
    const item = localStorage.getItem("isGoogleLogin");
    if (item) {
      handleSteps(ESTEPS.THREE);
    } else {
      handleSteps(ESTEPS.ONE);
    }
    async function initializeOpenLogin() {
      item && setLoader(true);
      setInitLoader(true);
      const chainConfig = {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: BaseGoerli.chainIdHex,
        rpcTarget: BaseGoerli.info.rpc,
        displayName: BaseGoerli.name,
        blockExplorer: BaseGoerli.explorer.url,
        ticker: BaseGoerli.symbol,
        tickerName: "Ethereum",
      };
      const web3auth = new Web3AuthNoModal({
        clientId: web3AuthClientId,
        web3AuthNetwork: "testnet",
        chainConfig: chainConfig,
      });
      const privateKeyProvider = new EthereumPrivateKeyProvider({
        config: { chainConfig },
      });
      const openloginAdapter = new OpenloginAdapter({
        adapterSettings: {
          uxMode: "popup",
          loginConfig: {
            google: {
              name: productName,
              verifier: web3AuthVerifier,
              typeOfLogin: web3AuthLoginType,
              clientId: oauthClientId,
            },
          },
        },
        loginSettings: {
          mfaLevel: "none",
        },
        privateKeyProvider,
      });
      web3auth.configureAdapter(openloginAdapter);
      setWeb3auth(web3auth);
      await web3auth.init();
      setProvider(web3auth.provider);
      setInitLoader(false);
    }
    initializeOpenLogin();
  }, []);

  useEffect(() => {
    if (web3auth && web3auth.connected) {
      setLoader(true);
      getAccounts()
        .then((res: any) => {
          setLoader(false);
          dispatch({
            type: ACTIONS.LOGGED_IN_VIA,
            payload: LOGGED_IN.GOOGLE,
          });
          dispatch({
            type: ACTIONS.SET_ADDRESS,
            payload: res,
          });
          setWalletAddress(res);
        })
        .catch((e) => {
          console.log(e, "error");
        });
    }
  }, [provider]);

  const signIn: any = async () => {
    setLoader(true);
    try {
      if (!web3auth) {
        return;
      }
      if (web3auth.connected) {
        return;
      }
      const web3authProvider = await web3auth.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
          loginProvider: "google",
        }
      );

      setProvider(web3authProvider);
      const acc = (await getAccounts()) as any;
      localStorage.setItem("isConnected", "true");
      localStorage.setItem("isGoogleLogin", "true");
      dispatch({
        type: ACTIONS.LOGGED_IN_VIA,
        payload: LOGGED_IN.GOOGLE,
      });
      dispatch({
        type: ACTIONS.SET_ADDRESS,
        payload: acc,
      });
      setWalletAddress(acc);
      setLoader(false);
      handleSteps(ESTEPS.THREE);
    } catch (e) {
      setLoader(false);
      console.log(e, "e");
    }
  };

  const getAccounts = async () => {
    if (!provider) {
      return;
    }
    try {
      const ethProvider = new ethers.providers.Web3Provider(provider);
      const safe = createSafe(ethProvider.getSigner());
      const contractAddress = await safe.getSafeAddress();
      return contractAddress;
    } catch (error) {
      setLoader(false);
      return error;
    }
  };

  const signOut = async () => {
    await web3auth?.logout();
    localStorage.removeItem("isGoogleLogin");
    localStorage.removeItem("isConnected");
    setStep(ESTEPS.ONE);

    dispatch({
      type: ACTIONS.LOGGED_IN_VIA,
      payload: "",
    });
    dispatch({
      type: ACTIONS.LOGOUT,
      payload: "",
    });
    dispatch({
      type: ACTIONS.SET_ADDRESS,
      payload: "",
    });
    dispatch({
      type: ACTIONS.SET_IS_CONNECTED,
      payload: false,
    });
    if (isConnected) {
      await disconnect();
    }
    setWalletAddress("");
    setOpenBottomSheet(false);
  };

  const handleSteps = (step: number) => {
    setStep(step);
  };

  const getUIComponent = (step: number) => {
    switch (step) {
      case ESTEPS.ONE:
        return (
          <Login
            handleSetupChest={handleSetupChest}
            loader={loader}
            signIn={signIn}
          />
        );
      case ESTEPS.TWO:
        return (
          <ConnectWallet
            signIn={signIn}
            handleSteps={handleSteps}
            loader={loader}
          />
        );
      case ESTEPS.THREE:
        return <HomePage walletAddress={walletAddress} />;
      default:
        return <></>;
    }
  };

  const handleSetupChest = async () => {
    if (walletAddress) {
      handleSteps(ESTEPS.THREE);
    } else {
      handleSteps(ESTEPS.TWO);
    }
  };
  const onHamburgerClick = () => {
    setOpenBottomSheet(true);
  };

  const connectWallet = async () => {
    setConnecting(true);
    try {
      await openConnectModal?.();
    } catch (e: any) {
      const err = serializeError(e);
      setConnecting(false);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (address && !isConnecting && connecting) {
      localStorage.setItem("isConnected", "true");
      localStorage.setItem("isGoogleLogin", "false");
      dispatch({
        type: ACTIONS.SET_ADDRESS,
        payload: address,
      });
      dispatch({
        type: ACTIONS.LOGGED_IN_VIA,
        payload: LOGGED_IN.EXTERNAL_WALLET,
      });
      setConnecting(false);
      setWalletAddress(address);
      handleSteps(ESTEPS.THREE);
    }
  }, [isConnecting]);

  return (
    <div className="relative">
      {/* <AnonAadhaarProvider> */}
      {loader && (
        <div className="container mx-auto relative">
          <div className="w-full h-screen absolute left-0 top-0 z-10 flex items-center justify-center">
            <div className="spinnerLoader" />
          </div>
        </div>
      )}

      <Header signIn={signIn} step={step} signOut={signOut} />

      <ToastContainer
        toastStyle={{ backgroundColor: "#282B30" }}
        className={`w-50`}
        style={{ width: "600px" }}
        position="bottom-center"
        autoClose={6000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
      />
      {getUIComponent(step)}
      <BottomSheet
        isOpen={openBottomSheet}
        onClose={() => {
          setOpenBottomSheet(false);
        }}
        walletAddress={walletAddress}
        signOut={signOut}
        signIn={signIn}
        handleSteps={handleSteps}
      />
      {pathname !== "/" ? <Footer /> : null}
      {/* </AnonAadhaarProvider> */}
    </div>
  );
}
