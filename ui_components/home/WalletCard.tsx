import Image from "next/image";

import { icons } from "../../utils/images";
import {
  getCurrencyFormattedNumber,
  getNounAvatar,
  trimAddress,
} from "../../utils";

import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function WalletCard(props: any) {
  const { tokenBalance } = props;
  const {
    state: { address },
  } = useContext(GlobalContext);

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
          {getCurrencyFormattedNumber(tokenBalance)}
        </p>
        <div className="flex items-center gap-2 bg-primary-600 p-2 rounded-3xl cursor-pointer">
          <Image className="w-6" src={icons.polygon} alt="polygon" />
          <p className="meta font-medium text-white ">Polygon Mumbai</p>
        </div>
      </div>
    </div>
  );
}
