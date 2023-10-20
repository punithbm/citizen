import Image from "next/image";

import { icons } from "../../utils/images";
import { useAccount } from "wagmi";
import { publicClient } from "../../utils/viem";
import { useContext, useMemo, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { getUsdPrice } from "../../apiServices";
import { getCurrencyFormattedNumber, getTokenValueFormatted } from "../../utils";

export default function WalletCard() {
  const {
    state: { address },
  } = useContext(GlobalContext);
  const [balance, setBalance] = useState(0);
  useMemo(async () => {
    if (address) {
      //@ts-ignore
      const balance = await publicClient.getBalance({ address });
      getUsdPrice().then(async (res: any) => {
        const formatBal = (Number(balance) / Math.pow(10, 18)) * res.data.ethereum.usd;
        setBalance(formatBal);
      });
    }
  }, [address]);

  console.log("address", address);

  return (
    <div className="bg-secondary-200 rounded-3xl px-4 py-6">
      <p className="supportText_medium text-text-500 mb-1.5">Wallet balance</p>
      <div className="mb-6 flex items-center gap-[14px]">
        <p className="subtitle_black">${balance}</p>
        <Image src={icons.eye} alt="show" />
      </div>
      <div className="flex items-center gap-10">
        <div>
          <p className="supportText_medium text-text-500 mb-1.5">Total Invested</p>
          <p className="paragraph_semibold text-text-900">$0.5</p>
        </div>
        <div>
          <p className="supportText_medium text-text-500 mb-1.5">Current value</p>
          <p className="paragraph_semibold text-text-900">$0.5</p>
        </div>
      </div>
    </div>
  );
}
