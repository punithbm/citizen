import { connect, fetchBalance, getAccount } from "@wagmi/core";
import { createContext, ReactNode, useContext } from "react";
import { ConnectArgs, disconnect, sendTransaction } from "wagmi/actions";
import { polygonMumbai } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";

import { WagmiHoc } from ".";

interface IProps {
  children?: ReactNode;
}

export type TGlobalContextType = {
  connect?: any;
  fetchBalance?: any;
  polygonMumbai?: any;
  InjectedConnector?: any;
  getAccount?: any;
  disconnect?: any;
};

export const WalletContext = createContext<TGlobalContextType>({
  connect: undefined,
});

const WagmiProvider = ({ children }: IProps) => {
  return (
    <WalletContext.Provider
      value={{
        connect,
        fetchBalance,
        polygonMumbai,
        InjectedConnector,
        getAccount,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

const WagmiWrapper = ({ children }: IProps) => {
  return (
    <WagmiHoc>
      <WagmiProvider>{children}</WagmiProvider>
    </WagmiHoc>
  );
};

const useWagmi = () => {
  const { connect, fetchBalance, polygonMumbai, InjectedConnector, getAccount, disconnect } = useContext(WalletContext);
  const injectConnector = new InjectedConnector({ chains: [polygonMumbai] });
  return {
    connect,
    fetchBalance,
    polygonMumbai,
    InjectedConnector,
    injectConnector,
    sendTransaction,
    getAccount,
    disconnect,
  };
};

export { useWagmi, WagmiWrapper };
