import Image from "next/image";
import { icons } from "../../utils/images";

export default function VaultListItem() {
  return (
    <div className="bg-secondary-50 p-3 rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image src={icons.vaultIcon} alt="" />
        <div className="">
          <p className="supportText_bold  text-text-900 mb-2">Name</p>
          <p className="meta">ID: vault3452</p>
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-2 mb-2">
          <Image src={icons.ethLogo} alt="" />
          <p className="supportText_bold text-text-900">1 ETH</p>
        </div>
        <p className="meta">Lock in: 1 Year</p>
      </div>
    </div>
  );
}
