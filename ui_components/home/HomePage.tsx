import { useContext, useEffect, useState } from "react";
import { TokenListItem, WalletActionCard } from ".";
import SlidingTab from "../shared/SlidingTab";
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
      <div className="container mx-auto relative h-full">
        <WalletActionCard />
        <div className="mb-4">
          <SlidingTab
            tabData={homeTabs}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
        </div>
        <div className="overflow-y-auto h-[calc(100vh-494px)] hide-scrollbar flex flex-col gap-3 pb-5">
          {[...Array(10).keys()].map((key) => {
            return <TokenListItem key={key} />;
          })}
        </div>
      </div>
    </div>
  );
}
