import { DEFAULT_EVM_CONTRACT_DECIMALS } from "../../constants";
import {
  getCurrencyFormattedNumber,
  getPercentageFormatter,
  getTokenFormattedNumber,
  getTokenValueFormatted,
  isPositiveValue,
} from "../../utils";

export default function TokenListItem(props: any) {
  const { token } = props;
  const balance =
    (token.balance / 10 ** token.contract_decimals) * token.quote_rate;

  return (
    <div className="bg-secondary-50 p-3 rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img className="w-12" src={token.logo_url} alt="" />
        <div className="">
          <p className="supportText_bold  text-text-900 mb-1">
            {" "}
            {getTokenValueFormatted(
              getTokenFormattedNumber(
                `${token.balance}`,
                token.contract_decimals
              )
            )}{" "}
            {token.contract_ticker_symbol}
          </p>
          <p className="meta">{getCurrencyFormattedNumber(token.quote_rate)}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="supportText_bold text-text-900 mb-1">
          {getCurrencyFormattedNumber(balance)}
        </p>

        <p
          className={`meta  ${
            isPositiveValue(token.quote_rate_24h) === true
              ? "text-green"
              : "text-red"
          }`}
        >
          {getPercentageFormatter(token.quote_rate_24h)}
          {
            <span className="pl-1">
              {getCurrencyFormattedNumber(
                (token.quote_rate_24h * Number(token.balance)) /
                  10 **
                    (token.contract_decimals ?? DEFAULT_EVM_CONTRACT_DECIMALS)
              )}
            </span>
          }
        </p>
      </div>
    </div>
  );
}
