export const cryptoSymbols = ["BINANCE:BTCUSDT", "BINANCE:ETHUSDT"];

export const cryptoInfoMap: {
  [key: string]: { name: string; logo: string; indicator: string };
} = {
  "BINANCE:BTCUSDT": {
    name: "Bitcoin (BTC)",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=014",
    indicator: "+2.56%",
  },
  "BINANCE:ETHUSDT": {
    name: "Ethereum (ETH)",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=014",
    indicator: "+1.43%",
  },
};

export const binanceToCoingeckoMap: { [key: string]: string } = {
  BTCUSDT: "bitcoin",
  ETHUSDT: "ethereum",
};
