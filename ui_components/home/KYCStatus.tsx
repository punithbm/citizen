import Image from "next/image";
import { icons } from "../../utils/images";
import { LogInWithAnonAadhaar } from "anon-aadhaar-react";
import BottomSheet from "../bottom-sheet";
import { useState } from "react";

export default function KYCStatus(props: any) {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const handleOpenBottomSheet = () => {
    setOpenBottomSheet(true);
  };
  const handleCloseBottomSheet = () => {
    setOpenBottomSheet(false);
  };
  return (
    <>
      <div className="text-center">
        <Image
          src={icons.notVerified}
          alt="not verified"
          className="mx-auto mb-6"
        />
        <p className="paragraph_semibold text-text-900 mb-2">
          Your KYC is not verified!
        </p>
        <p className="supportText_regular text-text-500 mb-4">
          To get full access to our wallet, verify your KYC now.
        </p>
        <p
          className="supportText_medium text-primary-800 cursor-pointer mb-4"
          onClick={handleOpenBottomSheet}
        >
          Know why?
        </p>
        <LogInWithAnonAadhaar />
      </div>
      <BottomSheet
        isOpen={openBottomSheet}
        onClose={() => {
          setOpenBottomSheet(false);
        }}
      >
        <div className="px-4 py-5">
          <div className="flex items-center justify-between mb-5">
            <p className="paragraph_semibold text-text-900">Why KYC?</p>
            <Image
              onClick={handleCloseBottomSheet}
              src={icons.close}
              alt="close"
              className="cursor-pointer"
            />
          </div>
          <p className="supportText_regular text-text-500">
            We believe regulatory compliance is essential for building trust in
            DeFi and bringing it to the masses. We invite builders to create a
            web3 wallet that combines security, convenience, and regulatory
            oversight to prevent illicit activity. KYC, privacy, and tax
            compliance are key elements that regulators are focused on. We aim
            to integrate compliance into DeFi to facilitate a seamless and
            legally compliant financial experience for all.
          </p>
        </div>
      </BottomSheet>
    </>
  );
}
