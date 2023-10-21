import backIcon from "../../public/assets/images/back_icon.png";
import chevronRight from "../../public/assets/images/chevron_right.svg";
import copyBlack from "../../public/assets/images/copy_black.svg";
import copyIconWhite from "../../public/assets/images/copy_icon_white.svg";
import ethLogo from "../../public/assets/images/eth_logo.svg";
import googleIcon from "../../public/assets/images/google_icon.svg";
import helpIcon from "../../public/assets/images/help_icon.svg";
import logo from "../../public/assets/images/logo.svg";
import logoutIcon from "../../public/assets/images/logout_icon.svg";
import loginBg from "../../public/assets/images/login_bg.svg";
import chevronDown from "../../public/assets/images/chevron_down.svg";
import eye from "../../public/assets/images/eye.svg";
import depositIcon from "../../public/assets/images/deposit_icon.svg";
import withdrawIcon from "../../public/assets/images/withdraw_icon.svg";
import vaultIcon from "../../public/assets/images/vault_icon.svg";
import chevronBack from "../../public/assets/images/chevron_back.svg";
import arrowDownCircle from "../../public/assets/images/arrow_down_circle.svg";
import walletIcon from "../../public/assets/images/wallet_icon.png";
import avalanche from "../../public/assets/images/avalanche.svg";
import sendIcon from "../../public/assets/images/send_icon.svg";
import receiveIcon from "../../public/assets/images/receive_icon.svg";
import swapIcon from "../../public/assets/images/swap_icon.svg";
import buyIcon from "../../public/assets/images/buy_icon.svg";
import logOut from "../../public/assets/images/log_out.svg";
import notVerified from "../../public/assets/images/not_verified.svg";
import close from "../../public/assets/images/close.svg";
import txSuccess from "../../public/assets/images/tx_success.svg";

export type TImages =
  | "logo"
  | "backIcon"
  | "googleIcon"
  | "chevronRight"
  | "copyBlack"
  | "logoutIcon"
  | "helpIcon"
  | "copyIconWhite"
  | "ethLogo"
  | "loginBg"
  | "chevronDown"
  | "eye"
  | "depositIcon"
  | "withdrawIcon"
  | "vaultIcon"
  | "chevronBack"
  | "walletIcon"
  | "avalanche"
  | "sendIcon"
  | "receiveIcon"
  | "swapIcon"
  | "buyIcon"
  | "logOut"
  | "notVerified"
  | "close"
  | "txSuccess"
  | "arrowDownCircle";

export type TNextImage = {
  src: string;
  height: number;
  width: number;
};

export const icons: Record<TImages, TNextImage> = {
  logo,

  backIcon,
  googleIcon,
  chevronRight,
  copyBlack,
  logoutIcon,
  helpIcon,
  ethLogo,
  copyIconWhite,
  loginBg,
  chevronDown,
  eye,
  depositIcon,
  withdrawIcon,
  vaultIcon,
  chevronBack,
  arrowDownCircle,
  walletIcon,
  avalanche,
  sendIcon,
  receiveIcon,
  swapIcon,
  buyIcon,
  logOut,
  notVerified,
  close,
  txSuccess,
};
