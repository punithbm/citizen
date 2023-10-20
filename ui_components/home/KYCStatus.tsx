import Image from "next/image";
import { icons } from "../../utils/images";
import { LogInWithAnonAadhaar } from "anon-aadhaar-react";

export default function KYCStatus(props: any) {
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
        <p className="supportText_medium text-primary-800 cursor-pointer mb-4">
          Know why?
        </p>
        <LogInWithAnonAadhaar />
      </div>
      {/* <BottomSheet
        isOpen={openBottomSheet}
        onClose={() => {
          setOpenBottomSheet(false);
        }}
        walletAddress={walletAddress}
        signOut={signOut}
        signIn={signIn}
        handleSteps={handleSteps}
      /> */}
    </>
  );
}
