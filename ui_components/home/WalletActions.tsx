import { icons } from "../../utils/images";
import { IconButton } from "../shared";
import { ESTEPS } from "../../pages";
import { useRouter } from "next/navigation";

export default function WalletActions(props: any) {
  const { setStep } = props;
  const router = useRouter();

  const actions = [
    {
      id: 1,
      name: "Send",
      icon: icons.sendIcon.src,
      onClick: () => {
        setStep(ESTEPS.THREE);
      },
    },
    {
      id: 2,
      name: "Receive",
      icon: icons.receiveIcon.src,
      onClick: () => {},
    },
    {
      id: 3,
      name: "Swap",
      icon: icons.swapIcon.src,
      onClick: () => {},
    },
    {
      id: 4,
      name: "Buy",
      icon: icons.buyIcon.src,
      onClick: () => {
        router.push("buy");
      },
    },
  ];
  return (
    <ul className="flex items-center justify-between px-5 relative">
      {actions?.map((item) => (
        <li key={item.id} onClick={item.onClick}>
          <IconButton
            type="button"
            className={`flex flex-col items-center meta_medium outline-0 text-white`}
            leftIcon={
              <img src={item.icon} alt={"more icon"} className="w-10 mb-2" />
            }
          >
            {item.name}
          </IconButton>
        </li>
      ))}
    </ul>
  );
}
