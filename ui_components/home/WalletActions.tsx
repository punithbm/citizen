import { icons } from "../../utils/images";
import { IconButton } from "../shared";
import { ESTEPS } from "../../pages";
import { useRouter } from "next/navigation";
import BottomSheet from "../bottom-sheet";
import { useState } from "react";
import Image from "next/image";
import { ReceiveQR } from ".";
import React from "react";

export default function WalletActions(props: any) {
  const { setStep, aadharStatus } = props;
  const router = useRouter();
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const handleOpenBottomSheet = () => {
    setOpenBottomSheet(true);
  };
  const handleCloseBottomSheet = () => {
    setOpenBottomSheet(false);
  };
  const actions = [
    {
      id: 1,
      name: "Send",
      icon: icons.sendIcon.src,
      onClick: () => {
        setStep(ESTEPS.THREE);
      },
      disabled: false,
    },
    {
      id: 2,
      name: "Receive",
      icon: icons.receiveIcon.src,
      onClick: () => {
        handleOpenBottomSheet();
      },
      disabled: false,
    },
    {
      id: 3,
      name: "Swap",
      icon: icons.swapIcon.src,
      onClick: () => {},
      disabled: false,
    },
    {
      id: 4,
      name: "Buy",
      icon: icons.buyIcon.src,
      onClick: () => {
        router.push("buy");
      },
      disabled: false,
    },
  ];
  const updatedActions = actions.map((item) => {
    if (["Send", "Swap", "Buy"].includes(item.name)) {
      if (aadharStatus === "logged-in") {
        return { ...item, disabled: false };
      } else {
        return { ...item, disabled: true };
      }
    }
    return item;
  });
  return (
    <>
      {" "}
      <ul className="flex items-center justify-between px-5 relative">
        {updatedActions?.map((item) => (
          <li key={item.id} onClick={item.onClick}>
            <IconButton
              type="button"
              className={`flex flex-col items-center meta_medium outline-0 !text-white ${
                item.disabled ? "cursor-not-allowed" : ""
              }`}
              leftIcon={
                <img src={item.icon} alt={"more icon"} className="w-10 mb-2" />
              }
              disabled={item.disabled}
            >
              {item.name}
            </IconButton>
          </li>
        ))}
      </ul>
      <BottomSheet
        isOpen={openBottomSheet}
        onClose={() => {
          setOpenBottomSheet(false);
        }}
      >
        <ReceiveQR handleCloseBottomSheet={handleCloseBottomSheet} />
      </BottomSheet>
    </>
  );
}
