import { useContext, useEffect, useMemo, useState } from "react";

import {
  ActivitiesListItem,
  KYCStatus,
  TokenListItem,
  WalletActionCard,
} from ".";
import { homeTabs } from "../../constants";
import { GlobalContext } from "../../context/GlobalContext";
import { getActivities, getTokens } from "../../apiServices";
import { SlidingTab } from "../shared";
import { useAnonAadhaar } from "anon-aadhaar-react";
import { getTokenFormattedNumber, getTokenValueFormatted } from "../../utils";

export default function HomePage(props: any) {
  const { setStep } = props;
  const {
    state: { address },
  } = useContext(GlobalContext);
  const [anonAadhaar] = useAnonAadhaar();

  const [activeTab, setActiveTab] = useState("tokens");
  const [aadharStatus, setAadharStatus] = useState("");
  const [tokensList, setTokensList] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);

  const handleTabClick = (id: any) => {
    setActiveTab(id);
  };

  useEffect(() => {
    async function fetchTokens() {
      const resTokens: any = await getTokens(address);
      const resActivities: any = await getActivities(address);
      const tokens = resTokens?.data?.items;
      const activities = resActivities?.data?.items;
      setTokensList(tokens);
      setActivitiesList(activities);
    }
    if (address) {
      fetchTokens();
    }
  }, [address]);

  useEffect(() => {
    setAadharStatus(anonAadhaar.status);
  }, [anonAadhaar]);

  const tokenBalance = useMemo(() => {
    return tokensList.reduce((totalBalance, token: any) => {
      const tokenValue = Number(
        getTokenValueFormatted(
          getTokenFormattedNumber(`${token.balance}`, token.contract_decimals)
        )
      );
      const balance = tokenValue * 0.5;
      return totalBalance + balance;
    }, 0);
  }, [tokensList]);

  return (
    <div className="pt-[96px] bg-white h-[100dvh] relative">
      <div className="container mx-auto relative h-full">
        <WalletActionCard
          setStep={setStep}
          aadharStatus={aadharStatus}
          tokenBalance={tokenBalance}
        />
        {aadharStatus === "logged-in" ? (
          <div>
            <div className="mb-4">
              <SlidingTab
                tabData={homeTabs}
                handleTabClick={handleTabClick}
                activeTab={activeTab}
              />
            </div>
            <div className="overflow-y-auto h-[calc(100vh-494px)] hide-scrollbar flex flex-col gap-3 pb-5">
              {activeTab === "tokens" ? (
                <>
                  {tokensList?.length > 0 &&
                    tokensList.map((item, key) => {
                      return <TokenListItem key={key} token={item} />;
                    })}
                </>
              ) : (
                <>
                  {activitiesList?.length > 0 &&
                    activitiesList.map((item, key) => {
                      return <ActivitiesListItem key={key} activity={item} />;
                    })}
                </>
              )}
            </div>
          </div>
        ) : (
          <KYCStatus />
        )}
      </div>
    </div>
  );
}
