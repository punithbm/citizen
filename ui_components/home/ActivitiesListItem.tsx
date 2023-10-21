import React from "react";
import {
  TXN_TYPE,
  getCurrencyFormattedNumber,
  getQuoteFromQuoteRate,
  getTokenFormattedNumber,
  getTokenValueFormatted,
  getTransactionTypeName,
  trimAddress,
} from "../../utils";

export default function ActivitiesListItem(props: any) {
  const { activity } = props;
  const getImageByName = () => {
    if (activity.type === "Send" || activity.type === "Receive") {
      return activity.type?.toLowerCase();
    } else {
      return activity.type;
    }
  };

  return (
    <div className="bg-secondary-50 p-3 rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img className="w-12" src={activity?.gas_metadata?.logo_url} alt="" />
        <div className="">
          <p className="supportText_bold !text-text-900 mb-1">
            {getTokenValueFormatted(
              getTokenFormattedNumber(
                `${activity.balance}`,
                activity.contract_decimals
              )
            )}{" "}
            {activity?.gas_metadata?.contract_ticker_symbol}
          </p>
          <ul className="">
            {activity.type === TXN_TYPE.Swap ||
            activity.type === TXN_TYPE.SwapExactTokensForTokens ||
            activity.type === TXN_TYPE.Approved ||
            activity.type === TXN_TYPE.Stake ||
            activity.type === TXN_TYPE.AddLiquidity ||
            activity.type === TXN_TYPE.RemoveLiquidity ||
            activity.type === TXN_TYPE.Lend ? (
              ""
            ) : activity.type === TXN_TYPE.Receive ||
              activity.type === TXN_TYPE.Token_Transferred ? (
              <li className="meta">
                From :
                <span className="ml-1">
                  {trimAddress(activity.from_address)}
                </span>
              </li>
            ) : activity.type === TXN_TYPE.Send ? (
              <li className="meta">
                To :
                <span className="ml-1">
                  {trimAddress(
                    activity.sent[0]?.to_address || activity.to_address
                  )}
                </span>
              </li>
            ) : activity.type === TXN_TYPE.Smart_Contract ? (
              <li className="meta">
                Address :
                <span className="ml-1">{trimAddress(activity.to_address)}</span>
              </li>
            ) : activity.type === TXN_TYPE.Withdraw ? (
              <li className="meta">
                From :
                <span className="ml-1">{trimAddress(activity.to_address)}</span>
              </li>
            ) : (
              <li className="meta">
                To :
                <span className="ml-1">{trimAddress(activity.to_address)}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="text-right">
        <p className="supportText_bold !text-text-900 mb-1">
          {getQuoteFromQuoteRate(
            Number(activity.value),
            activity?.gas_metadata?.decimals,
            Number(activity.value_quote)
          )}
        </p>
      </div>
    </div>
  );
}
