import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { FINNHUB_API_KEY, FINNHUB_BASE_URL } from "../configs/env";
import { CoinGeckoCandleData, StockPrice } from "../types/stocks";

export const fetchStockPrice = async (symbol: string): Promise<StockPrice> => {
  // throw new Error("test");
  const { data } = await axios.get(
    `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
  );

  console.log({ data });

  return data;
};

export const fetchCryptoCandles = async ({
  queryKey,
}: QueryFunctionContext): Promise<CoinGeckoCandleData> => {
  const [_, id] = queryKey;
  const end = Math.floor(Date.now() / 1000);
  const start = end - 24 * 60 * 60 * 30; // 24 hours ago

  // await sleep(3000);
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range`,
    {
      params: {
        vs_currency: "usd",
        from: start,
        to: end,
      },
    }
  );

  return response.data;
};
