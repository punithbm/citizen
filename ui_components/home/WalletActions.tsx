import { icons } from "../../utils/images";
import { IconButton } from "../shared";

export default function WalletActions() {
  const actions = [
    { id: 1, name: "Send", icon: icons.sendIcon.src },
    { id: 2, name: "Receive", icon: icons.receiveIcon.src },
    { id: 3, name: "Swap", icon: icons.swapIcon.src },
    { id: 4, name: "Buy", icon: icons.buyIcon.src },
  ];
  return (
    <ul className="flex items-center justify-between px-5 relative">
      {actions?.map((item) => (
        <li key={item.id}>
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
