import Image from "next/image";
import * as React from "react";

import { icons } from "../../utils/images";

export default function WalletCard() {
  return (
    <div className="bg-secondary-200 rounded-3xl px-4 py-6">
      <p className="supportText_medium text-text-500 mb-1.5">Wallet balance</p>
      <div className="mb-6 flex items-center gap-[14px]">
        <p className="subtitle_black">$5.20</p>
        <Image src={icons.eye} alt="show" />
      </div>
      <div className="flex items-center gap-10">
        <div>
          <p className="supportText_medium text-text-500 mb-1.5">
            Total Invested
          </p>
          <p className="paragraph_semibold text-text-900">$0.5</p>
        </div>
        <div>
          <p className="supportText_medium text-text-500 mb-1.5">
            Current value
          </p>
          <p className="paragraph_semibold text-text-900">$0.5</p>
        </div>
      </div>
    </div>
  );
}
