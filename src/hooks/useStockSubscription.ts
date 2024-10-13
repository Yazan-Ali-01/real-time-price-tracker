import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useStockQuery } from "./useStockQueries";

export const useStockSubscription = (symbol: string) => {
  const { isConnected, subscribeToStock, unsubscribeFromStock } =
    useSocketContext();
  const { data, isLoading } = useStockQuery(symbol);

  useEffect(() => {
    if (isConnected) {
      console.log(`Setting up subscription for ${symbol}`);
      subscribeToStock(symbol);
    }

    return () => {
      if (isConnected) {
        console.log(`Cleaning up subscription for ${symbol}`);
        unsubscribeFromStock(symbol);
      }
    };
  }, [isConnected, subscribeToStock, unsubscribeFromStock, symbol]);

  return { data, isLoading };
};
