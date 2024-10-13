import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FinnhubMessage, StockPrice } from "../types/stocks";
import { FINNHUB_API_KEY, FINNHUB_SOCKET_URL } from "../configs/env";
import { showToast } from "../components/core/Toast";

interface SocketContextProps {
  isConnected: boolean;
  subscribeToStock: (symbol: string) => void;
  unsubscribeFromStock: (symbol: string) => void;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

const FINNHUB_WEBSOCKET_URL = `${FINNHUB_SOCKET_URL}?token=${FINNHUB_API_KEY}`;

const RECONNECT_INTERVAL = 5000;
const MAX_RETRIES = 5; // Maximum number of retries

export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const reconnectTimeoutRef = useRef<number | null>(null);
  const retryCountRef = useRef(0); // Use ref to track retries

  const connectWebSocket = useCallback(() => {
    const ws = new WebSocket(FINNHUB_WEBSOCKET_URL);

    ws.onopen = () => {
      console.log("Connected to Finnhub WebSocket");
      setIsConnected(true);
      setSocket(ws);
      retryCountRef.current = 0; // Reset retry count on successful connection
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };

    ws.onclose = (event) => {
      console.log(`Disconnected from Finnhub WebSocket: ${event.reason}`);
      setIsConnected(false);
      setSocket(null);

      // Check if we have exceeded max retries
      if (retryCountRef.current < MAX_RETRIES) {
        reconnectTimeoutRef.current = window.setTimeout(() => {
          retryCountRef.current += 1; // Increment retry count
          connectWebSocket(); // Try to reconnect
        }, RECONNECT_INTERVAL);
      } else {
        console.log("Maximum reconnect attempts reached. Stopping retries.");
      }
    };

    ws.onerror = (error) => {
      console.log("WebSocket error:", error);
    };

    ws.onmessage = (event) => {
      try {
        const message: FinnhubMessage = JSON.parse(event.data);
        if (message.type === "trade") {
          message.data.forEach((trade) => {
            queryClient.setQueryData(
              ["stock", trade.s],
              (oldData: StockPrice | undefined) => {
                const previousPrice = oldData?.c ?? trade.p;
                const currentPrice = trade.p;
                const change = currentPrice - previousPrice;
                const percentChange = (change / previousPrice) * 100;

                return {
                  ...(oldData || {}),
                  s: trade.s,
                  c: trade.p, // Current price
                  d: change, // Price change
                  dp: percentChange, // Percentage change
                  v: trade.v, // Trade volume
                  p: trade.p, // Last traded price
                  t: trade.t, // Timestamp
                };
              }
            );
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log("Error processing WebSocket message:", error);
          showToast("Error processing message: " + error.message, "error");
        } else {
          console.log("Unexpected error:", error);
          showToast("An unexpected error occurred", "error");
        }
        // Close the socket to trigger onclose logic
        ws.close();
      }
    };

    return ws;
  }, [queryClient]);

  useEffect(() => {
    const ws = connectWebSocket();
    return () => {
      if (ws) {
        ws.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connectWebSocket]);

  const subscribeToStock = useCallback(
    (symbol: string) => {
      if (socket && isConnected) {
        console.log(`Subscribing to stock: ${symbol}`);
        socket.send(JSON.stringify({ type: "subscribe", symbol: symbol }));
      } else {
        console.log(
          `Failed to subscribe to ${symbol}: WebSocket not connected`
        );
      }
    },
    [socket, isConnected]
  );

  const unsubscribeFromStock = useCallback(
    (symbol: string) => {
      if (socket && isConnected) {
        console.log(`Unsubscribing from stock: ${symbol}`);
        socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
      } else {
        console.log(
          `Failed to unsubscribe from ${symbol}: WebSocket not connected`
        );
      }
    },
    [socket, isConnected]
  );

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        subscribeToStock,
        unsubscribeFromStock,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};
