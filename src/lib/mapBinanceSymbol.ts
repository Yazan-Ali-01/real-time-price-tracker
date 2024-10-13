import { binanceToCoingeckoMap } from "../configs/cryptoSymbols";

export const mapBinanceSymbolToCoingeckoId = (
  binanceSymbol: string
): string => {
  const symbol = binanceSymbol.replace("BINANCE:", "");

  const coingeckoId = binanceToCoingeckoMap[symbol];
  if (!coingeckoId) {
    throw new Error(
      `No CoinGecko ID found for Binance symbol: ${binanceSymbol}`
    );
  }

  return coingeckoId;
};
