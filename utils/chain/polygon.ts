import { CHAINS_ENUMS, CHAINS_IDS } from ".";

export const Polygon = {
  index: 10,
  id: "polygon",
  name: "Polygon Mumbai",
  logo: "https://storage.googleapis.com/frontier-wallet/blockchains/base/info/logo.svg",
  coinId: 80001,
  symbol: "MATIC",
  chainId: "80001",
  chainIdHex: "0x13881",
  decimals: 18,
  blockchain: CHAINS_ENUMS?.ETHEREUM,
  derivation: {
    path: "m/44'/60'/0'/0/0",
  },
  curve: "secp256k1",
  publicKeyType: "secp256k1Extended",
  explorer: {
    url: "https://mumbai.polygonscan.com/",
    explorerName: "Polygon Scan",
    txPath: "/tx/",
    accountPath: "/address/",
  },
  info: {
    url: "https://polygon-mumbai.g.alchemy.com/v2/4twDaZ1szgaV3gpcG1scbEPMVTp8hTqh",
    rpc: "https://polygon-mumbai.g.alchemy.com/v2/4twDaZ1szgaV3gpcG1scbEPMVTp8hTqh",
  },
};
