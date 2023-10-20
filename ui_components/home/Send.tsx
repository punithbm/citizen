import "react-toastify/dist/ReactToastify.css";
import { initWasm } from "@trustwallet/wallet-core";
import { serializeError } from "eth-rpc-errors";
import { BigNumber, ethers } from "ethers";
import Lottie from "lottie-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { parseEther } from "viem";

import { getBalance, getRelayTransactionStatus, getSendTransactionStatus, getUsdPrice } from "../../apiServices";
import { GlobalContext } from "../../context/GlobalContext";
import { LOGGED_IN, THandleStep } from "../../pages";
import * as loaderAnimation from "../../public/lottie/loader.json";
import { getCurrencyFormattedNumber, getTokenFormattedNumber, getTokenValueFormatted, hexToNumber } from "../../utils";
import { BaseGoerli } from "../../utils/chain/baseGoerli";
import { icons } from "../../utils/images";
import { Wallet } from "../../utils/wallet";
import PrimaryBtn from "../PrimaryBtn";
import SecondaryBtn from "../SecondaryBtn";
import { useWagmi } from "../../utils/wagmi/WagmiContext";
import ReactTyped from "react-typed";
import { createSafe } from "@instadapp/avocado";

export interface ILoadChestComponent {
  provider?: any;
}
export const SendTx: FC<ILoadChestComponent> = (props) => {
  const { provider } = props;

  const {
    state: { loggedInVia, address },
  } = useContext(GlobalContext);

  const router = useRouter();

  const [value, setValue] = useState("");
  const [price, setPrice] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [tokenValue, setTokenValue] = useState(0);
  const [fromAddress, setFromAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [btnDisable, setBtnDisable] = useState(true);
  const [balanceInUsd, setBalanceInUsd] = useState("");
  const [showActivity, setShowActivity] = useState(false);
  const [chestLoadingText, setChestLoadingText] = useState("");
  const [toAddress, setToAddress] = useState("");

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const { sendTransaction } = useWagmi();

  useEffect(() => {
    if (address) {
      fetchBalance();
    }
  }, [address]);

  const fetchBalance = async () => {
    setLoading(true);
    getUsdPrice()
      .then(async (res: any) => {
        setTokenPrice(res.data.ethereum.usd);
        setFromAddress(address);
        const balance = (await getBalance(address)) as any;
        setTokenValue(getTokenFormattedNumber(hexToNumber(balance.result) as unknown as string, 18));
        const formatBal = ((hexToNumber(balance.result) / Math.pow(10, 18)) * res.data.ethereum.usd).toFixed(3);
        setPrice(getCurrencyFormattedNumber(formatBal));
        setBalanceInUsd(formatBal);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleValueClick = (val: string) => {
    setValue(`$${val}`);
    const valueWithoutDollarSign = val.replace(/[^\d.]/g, "");
    const tokenIputValue = Number(valueWithoutDollarSign) / Number(tokenPrice);
    setInputValue(getTokenValueFormatted(Number(tokenIputValue)));
  };

  const handleInputChange = (val: string) => {
    const valueWithoutDollarSign = val.replace(/[^\d.]/g, "");
    let appendDollar = "";
    if (Number(valueWithoutDollarSign) > 0) {
      appendDollar = "$";
    }
    setValue(`${appendDollar}${valueWithoutDollarSign}`);
    const tokenIputValue = Number(valueWithoutDollarSign) / Number(tokenPrice);
    setInputValue(getTokenValueFormatted(Number(tokenIputValue)));
    if (Number(valueWithoutDollarSign) < Number(balanceInUsd)) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  };

  const createWallet = async () => {
    const _inputValue = inputValue.replace(/[^\d.]/g, "");
    if (_inputValue) {
      const bgVal = BigNumber.from(parseEther(inputValue));
      const ethProvider = new ethers.providers.Web3Provider(provider);
      const safe = createSafe(ethProvider.getSigner());
      const owner = await safe.getOwnerAddress();

      console.log("ethProvider", ethProvider);
      console.log("owner", owner);
      const safeAddr = await safe.getSafeAddress();
      console.log("safeAddr", safeAddr);
      console.log("safe", safe);
      const signer = safe.getSigner();
      console.log("signer", signer);
      const signedTx = await signer.sendTransaction({
        to: toAddress,
        value: 0,
        chainId: 137,
      });
      console.log("signedTx", signedTx);
    }
  };

  return (
    <div className="pt-[156px] bg-white h-[100dvh] relative">
      <div className="container mx-auto relative">
        {!transactionLoading ? (
          <div>
            {!showActivity ? (
              <>
                <div className="rounded-lg border border-secondary-100 ">
                  <div className="flex items-center justify-between py-2 px-4">
                    <div>
                      <p className="text-secondary-100 paragraph">YOUR BALANCE</p>
                      <div className="flex items-start gap-3 my-2">
                        <Image
                          src={icons.helpIcon}
                          alt="transferIcon"
                          onClick={handleToggle}
                          className="cursor-pointer"
                        />
                        {toggle ? (
                          loading ? (
                            <div className="w-full h-full">
                              <div className="w-[40px] h-[10px] bg-white/10 animate-pulse rounded-lg mb-2"></div>
                              <div className="w[40px] h-[10px] bg-white/10 animate-pulse rounded-lg "></div>
                            </div>
                          ) : (
                            <div>
                              <p className="text-secondary-100 text-[24px] font-semibold leading-10 mb-2">{price}</p>
                              <p className="text-secondary-100 text-[12px] leading-[14px]">{tokenValue} ETH</p>
                            </div>
                          )
                        ) : loading ? (
                          <div className="w-full h-full">
                            <div className="w-[40px] h-[10px] bg-white/10 animate-pulse rounded-lg mb-2"></div>
                            <div className="w[40px] h-[10px] bg-white/10 animate-pulse rounded-lg "></div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-secondary-100 text-[24px] font-semibold leading-10 mb-2">
                              ~ {tokenValue} ETH
                            </p>
                            <p className="text-secondary-100 text-[12px] leading-[14px]">{price}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src={icons.ethLogo} alt="transferIcon" />
                      <p className="text-secondary-100 text-[24px] font-normal leading-9">ETH</p>
                    </div>
                  </div>
                </div>
                <div className="w-full mt-5 ">
                  <div className="relative rounded-lg border border-secondary-100  h-auto  p-4">
                    <div className="flex items-center justify-center">
                      <div>
                        <div className="flex items-center justify-center">
                          {/* <p className="text-[32px] text-white">$</p> */}
                          <input
                            name="usdValue"
                            style={{ caretColor: "white" }}
                            inputMode="decimal"
                            type="text"
                            className={`dollorInput pl-0 pt-2 pb-1 backdrop-blur-xl text-[32px] border-none text-center bg-transparent text-secondary-100 placeholder-grey  rounded-lg block w-full focus:outline-none focus:ring-transparent`}
                            placeholder="$0"
                            value={value}
                            onChange={(e) => {
                              handleInputChange(e.target.value);
                            }}
                            disabled={loading}
                            onWheel={() => (document.activeElement as HTMLElement).blur()}
                          />
                        </div>
                        {Number(inputValue) > 0 && (
                          <p className="text-secondary text-[12px] leading-[14px] text-center">~ {inputValue} ETH</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-5">
                  <div
                    className="rounded-lg border border-gray-500 bg-white/5 p-2 cursor-pointer"
                    role="presentation"
                    onClick={() => {
                      handleValueClick("10");
                    }}
                  >
                    <p className="text-center text-secondary-100">$10</p>
                  </div>
                  <div
                    className="rounded-lg border border-gray-500 bg-white/5 p-2 cursor-pointer"
                    role="presentation"
                    onClick={() => {
                      handleValueClick("20");
                    }}
                  >
                    <p className="text-center text-secondary-100">$20</p>
                  </div>
                  <div
                    className="rounded-lg border border-gray-500 bg-white/5 p-2 cursor-pointer"
                    role="presentation"
                    onClick={() => {
                      handleValueClick("50");
                    }}
                  >
                    <p className="text-center text-secondary-100">$50</p>
                  </div>
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    id="first_name"
                    className="border border-secondary-100 text-gray-900 text-sm rounded-lg block w-full p-3"
                    placeholder="Enter to wallet address"
                    value={toAddress}
                    onChange={(e) => {
                      setToAddress(e.target.value);
                    }}
                  />
                </div>
                <div className="relative mt-10">
                  <div className={`${!btnDisable && value ? "opacity-100" : "opacity-50"} flex gap-2 justify-center`}>
                    <SecondaryBtn
                      className={`w-[100%] border-secondary-100 mx-0 ${
                        btnDisable || !value ? "cursor-not-allowed" : ""
                      }`}
                      title={"Send"}
                      onClick={createWallet}
                    />
                  </div>
                </div>
              </>
            ) : null}
          </div>
        ) : (
          <div className="w-[full] max-w-[600px] h-full relative flex flex-col text-center items-center gap-5 mx-auto mt-20">
            <ReactTyped
              className="text-secondary-100 text-[24px]"
              strings={[chestLoadingText]}
              typeSpeed={40}
              loop={true}
            />
            <Lottie animationData={loaderAnimation} />
          </div>
        )}
      </div>
    </div>
  );
};
