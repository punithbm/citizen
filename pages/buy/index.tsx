import { useConnectModal } from "@rainbow-me/rainbowkit";
import { SafeEventEmitterProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { LOGGED_IN, ESTEPS } from "..";
import { ACTIONS, GlobalContext } from "../../context/GlobalContext";
import Header from "../../ui_components/header";
import { useWagmi } from "../../utils/wagmi/WagmiContext";
import { createSafe } from "@instadapp/avocado";
import { ethers } from "ethers";
import BackBtn from "../../ui_components/BackBtn";

export default function Buy() {
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

  return (
    <div className="relative h-screen">
      <Header signIn={signIn} step={step} signOut={signOut} />

      <iframe
        id="transakIframe"
        src="https://global-stg.transak.com/?apiKey=d1b94e78-4eca-4a4e-b64b-e13d64251171"
        allow="camera;microphone;payment"
        height={"100%"}
        width={"100%"}
        style={{ height: "100%", width: "100%" }}
      ></iframe>
    </div>
  );
}
