import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { FINNHUB_API_KEY, FINNHUB_BASE_URL } from "../configs/env";
import { CoinGeckoCandleData, StockPrice } from "../types/stocks";

/**
 * Fetches the stock price for a given symbol from the Finnhub API.
 *
 * @param symbol - The stock symbol to fetch the price for.
 * @returns A promise that resolves to a StockPrice object.
 * @throws Will throw an error if the request fails.
 */
export const fetchStockPrice = async (symbol: string): Promise<StockPrice> => {
  try {
    const { data } = await axios.get(`${FINNHUB_BASE_URL}/quote`, {
      params: {
        symbol,
        token: FINNHUB_API_KEY,
      },
    });

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Failed to fetch stock price for ${symbol}:`,
        error.message
      );
      throw new Error(`Could not fetch stock price: ${error.message}`);
    } else {
      console.error(
        `Unexpected error occurred while fetching stock price for ${symbol}:`,
        error
      );
      throw new Error(`Could not fetch stock price: ${String(error)}`);
    }
  }
};

/**
 * Fetches historical cryptocurrency candle data from the CoinGecko API  (HARDCODED LAST 30 DAYS).
 *
 * @param context - The context containing the query key, which includes the cryptocurrency ID.
 * @returns A promise that resolves to a CoinGeckoCandleData object.
 * @throws Will throw an error if the request fails.
 */
export const fetchCryptoCandles = async ({
  queryKey,
}: QueryFunctionContext): Promise<CoinGeckoCandleData> => {
  const [_, id] = queryKey; // Destructure the query key to get the ID
  const end = Math.floor(Date.now() / 1000); // Current time in seconds
  const start = end - 24 * 60 * 60 * 30; // 30 days ago

  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range`,
      {
        params: {
          vs_currency: "usd",
          from: start,
          to: end,
        },
      }
    );

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(`Failed to fetch crypto candles for ${id}:`, error.message);
      throw new Error(`Could not fetch crypto candles: ${error.message}`);
    } else {
      console.error(
        `Unexpected error occurred while fetching crypto candles for ${id}:`,
        error
      );
      throw new Error(`Could not fetch crypto candles: ${String(error)}`);
    }
  }
};
