import Image from "next/image";

import { icons } from "../../utils/images";

export default function WalletActions() {
  return (
    <ul className="flex items-center justify-between px-10 relative">
      <li className="flex items-center gap-2 support_text_semibold text-white">
        <Image src={icons.depositIcon} alt="deposit" />
        Deposit
      </li>
      <li className="absolute left-[48%] -translate-x-1/2 h-[18px] w-[1px] bg-secondary-500"></li>
      <li className="flex items-center gap-2 support_text_semibold text-white">
        <Image src={icons.withdrawIcon} alt="deposit" />
        Withdraw
      </li>
    </ul>
  );
}
