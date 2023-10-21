import { icons } from "../../utils/images";

import Image from "next/image";
import { Button } from "../shared";

export default function TaxAlertBottomSheet(props: any) {
  const { handleCloseBottomSheet } = props;
  return (
    <div className="px-4 py-5">
      <div className="flex items-center justify-between mb-5">
        <p className="paragraph_semibold text-text-900">Tax alert</p>
        <Image
          onClick={handleCloseBottomSheet}
          src={icons.close}
          alt="close"
          className="cursor-pointer"
        />
      </div>
      <p className="supportText_regular !text-text-500 mb-9">
        Your transaction amount exceeds ₹10,000. A 10% tax will be applied to
        all transactions above ₹10,000.
      </p>
      <div className="flex items-center justify-between gap-4">
        <Button
          className={`!rounded-full !text-base !w-[388px] mx-auto py-2`}
          variant={"ghost"}
          label="Cancel"
        />
        <Button
          className={`!bg-purple !rounded-full !text-base !w-[388px] mx-auto py-2`}
          variant={"primary"}
          label="Continue"
        />
      </div>
    </div>
  );
}
