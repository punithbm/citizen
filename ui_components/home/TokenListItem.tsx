import Image from "next/image";
import { icons } from "../../utils/images";

export default function TokenListItem() {
  return (
    <div className="bg-secondary-50 p-3 rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image className="w-12" src={icons.ethLogo} alt="" />
        <div className="">
          <p className="supportText_bold  text-text-900 mb-1">0.032098 ETH</p>
          <p className="meta">$1,609.99</p>
        </div>
      </div>
      <div className="text-right">
        <p className="supportText_bold text-text-900 mb-1">$51.67</p>

        <p className="meta text-green"> 3.96% $1.97</p>
      </div>
    </div>
  );
}
