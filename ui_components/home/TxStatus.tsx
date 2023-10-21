import Image from "next/image";
import { icons } from "../../utils/images";
import { Button } from "../shared";

export default function TxStatus(props: any) {
  return (
    <>
      <div className="pt-[15%] bg-white h-[100dvh] relative">
        <div className="container mx-auto text-center relative">
          <Image className="mx-auto mb-2" src={icons.txSuccess} alt="success" />
          <p className="subtitle_bold mb-4">Success!</p>
          <p className="text-text-600 paragraph">
            Your Matic tokens are successfully sent
          </p>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full py-4">
          <Button
            className={`!bg-purple !rounded-full !text-base !w-[388px] mx-auto mb-4`}
            variant={"primary"}
            label="View deposit"
          />
          <Button
            className={`!rounded-full !text-base !w-[388px] mx-auto`}
            variant={"ghost"}
            label="Back to wallet"
          />
        </div>
      </div>
    </>
  );
}
