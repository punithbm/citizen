import { useContext, useEffect, useState } from "react";
import { VaultListItem, WalletActionCard } from ".";
import SlidingTab from "../shared/SlidingTab";

import { Button } from "../shared";
import { homeTabs } from "../../constants";
import { GlobalContext } from "../../context/GlobalContext";
import { getActivities, getTokens } from "../../apiServices";

export default function HomePage(props: any) {
  const {
    state: { address },
  } = useContext(GlobalContext);

  const [activeTab, setActiveTab] = useState("tokens");

  const handleTabClick = (id: any) => {
    setActiveTab(id);
  };

  useEffect(() => {
    async function fetchTokens() {
      const resTokens: any = await getTokens(address);
      const resActivities: any = await getActivities(address);
      const tokens = resTokens?.data?.items;
      const activities = resActivities?.data?.items;
      debugger;
    }
    if (address) {
      fetchTokens();
    }
  }, [address]);

  return (
    <div className="pt-[96px] bg-white h-[100dvh] relative">
      <div className="container mx-auto relative">
        <WalletActionCard />
        <div className="mb-4">
          <SlidingTab tabData={homeTabs} handleTabClick={handleTabClick} activeTab={activeTab} />
        </div>
        <VaultListItem />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full py-4 bg-white">
        <Button className="!bg-purple !rounded-3xl !text-base !w-[388px] mx-auto" variant={"primary"} label="Create" />
      </div>
    </div>
  );
}
