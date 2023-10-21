import Image from "next/image";

import { icons } from "../../utils/images";
import { getNounAvatar, trimAddress } from "../../utils";
import { publicClient } from "../../utils/viem";
import { useContext, useMemo, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { getUsdPrice } from "../../apiServices";

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
        const formatBal =
          (Number(balance) / Math.pow(10, 18)) * res.data.ethereum.usd;
        setBalance(formatBal);
      });
    }
  }, [address]);

  const copyToClipBoard = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="bg-secondary-200 rounded-3xl px-3 py-4">
      <div className="flex items-center gap-3 mb-14">
        <Image
          width={48}
          height={48}
          className="w-12 rounded-full"
          src={getNounAvatar(address)}
          alt="wallet"
        />
        <div>
          <p className="supportText_medium text-text-500 mb-1">My wallet</p>
          <div className="flex items-center gap-2">
            <p className="paragraph_semibold">{trimAddress(address)}</p>
            <Image
              className=" cursor-pointer"
              onClick={copyToClipBoard}
              src={icons.copyBlack}
              alt="copy"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="heading1_black">
          $0<span className=" opacity-50"></span>
        </p>
        <div className="flex items-center gap-2 bg-primary-600 p-2 rounded-3xl cursor-pointer">
          <Image className="w-6" src={icons.polygon} alt="polygon" />
          <p className="meta font-medium text-white ">Polygon Mumbai</p>
        </div>
      </div>
    </div>
  );
}
