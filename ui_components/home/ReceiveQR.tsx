import { icons } from "../../utils/images";
import QRCodeStyling, {
  Options as QRCodeStylingOptions,
} from "qr-code-styling";
import Image from "next/image";
import { useContext, useEffect, useMemo, useRef } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { trimAddress } from "../../utils";

const useQRCodeStyling = (
  options: QRCodeStylingOptions
): QRCodeStyling | null => {
  if (typeof window !== "undefined") {
    const QRCodeStylingLib = require("qr-code-styling");
    const qrCodeStyling: QRCodeStyling = new QRCodeStylingLib(options);
    return qrCodeStyling;
  }
  return null;
};

export default function ReceiveQR(props: any) {
  const { handleCloseBottomSheet } = props;
  const {
    state: { address },
  } = useContext(GlobalContext);
  const ref = useRef<HTMLDivElement>(null);
  const copyToClipBoard = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(address);
  };

  const qrOptions: QRCodeStylingOptions = useMemo(() => {
    return {
      width: 240,
      height: 240,
      type: "svg",
      image: icons.logo.src,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "Q",
      },
      dotsOptions: {
        type: "extra-rounded",
        color: "#000",
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.6,
        margin: 12,
        crossOrigin: "anonymous",
      },
      backgroundOptions: {
        color: "#fff",
      },
    };
  }, []);

  const qrCode = useQRCodeStyling(qrOptions);

  useEffect(() => {
    if (ref.current && qrCode) {
      qrCode.append(ref.current);
    }
  }, [qrCode]);

  useEffect(() => {
    if (qrCode) {
      qrCode.update({
        data: address,
        dotsOptions: qrOptions.dotsOptions,
        backgroundOptions: qrOptions.backgroundOptions,
      });
    }
  }, [address]);

  return (
    <div className="px-4 py-5">
      <div className="flex items-center justify-between mb-5">
        <p className="paragraph_semibold text-text-900">Receive</p>
        <Image
          onClick={handleCloseBottomSheet}
          src={icons.close}
          alt="close"
          className="cursor-pointer"
        />
      </div>
      <p className="supportText_regular text-text-500 text-center">
        Scan this QR on your wallet
      </p>
      <div
        ref={ref}
        className="w-[250px]  h-[250px] mt-[20px] mb-5 mx-[auto]"
      />
      <p className="meta text-center mb-6">Or</p>
      <p className="supportText_regular text-text-500 text-center mb-4">
        Paste this wallet ID to your wallet
      </p>
      <div className="flex items-center gap-3 justify-center bg-secondary-700 p-4 rounded-2xl mb-4">
        <p className="paragraph_semibold">{trimAddress(address)}</p>
        <Image
          className=" cursor-pointer"
          onClick={copyToClipBoard}
          src={icons.copyBlack}
          alt="copy"
        />
      </div>
    </div>
  );
}
