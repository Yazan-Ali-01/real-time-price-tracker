// src/hooks/useStockQueries.ts
import {
  QueryFunctionContext,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { fetchCryptoCandles, fetchStockPrice } from "../api/stockApi";
import { queryKeys } from "../configs/queryKeys";
import { CoinGeckoCandleData, StockPrice } from "../types/stocks";

// Query function for an individual stock
const stockQueryFn = async ({ queryKey }: QueryFunctionContext) => {
  const symbol = queryKey[1] as string; // queryKey[0] is "stock", queryKey[1] is the stock symbol
  return fetchStockPrice(symbol);
};

// Hook for fetching a single stock
export const useStockQuery = (symbol: string): UseQueryResult<StockPrice> => {
  return useQuery({
    queryKey: queryKeys.stock(symbol),
    queryFn: stockQueryFn,
    // select: (data) => ({
    //   c: data.c,
    //   d: data.d,
    //   dp: data.dp,
    // }),
  });
};

export const useCryptoCandlesQuery = (
  id: string
): UseQueryResult<CoinGeckoCandleData> => {
  return useQuery({
    queryKey: queryKeys.cryptoCandles(id),
    queryFn: fetchCryptoCandles,
    refetchInterval: 5 * 60 * 1000,
    select: (data: CoinGeckoCandleData): CoinGeckoCandleData => {
      // let reducedPrices;
      // reducedPrices = data.prices.filter((_, index) => index % 2 === 0);
      return data;
    },
  });
};
