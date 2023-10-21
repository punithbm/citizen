import {
  getCurrencyFormattedNumber,
  getTokenFormattedNumber,
  getTokenValueFormatted,
} from "../../utils";
import { icons } from "../../utils/images";

export default function TokenListItem(props: any) {
  const { token } = props;
  const tokenValue = Number(
    getTokenValueFormatted(
      getTokenFormattedNumber(`${token.balance}`, token.contract_decimals)
    )
  );
  const convertedBalance = tokenValue * 0.5;
  return (
    <div className="bg-secondary-50 p-3 rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img className="w-12" src={icons.polygon.src} alt="" />
        <div className="">
          <p className="supportText_bold  text-text-900 mb-1">
            {" "}
            {tokenValue} {token.contract_ticker_symbol}
          </p>
          <p className="meta">$0.5</p>
        </div>
      </div>
      <div className="text-right">
        <p className="supportText_bold text-text-900 mb-1">
          {getCurrencyFormattedNumber(convertedBalance)}
        </p>
      </div>
    </div>
  );
}
