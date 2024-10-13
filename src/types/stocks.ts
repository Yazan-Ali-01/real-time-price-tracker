export interface StockPrice {
  c: number; // Current price of the asset
  d: number; // Price change from the previous close
  dp: number; // Percentage change ((d / previous close) * 100)
  h: number; // Highest price during the current session
  l: number; // Lowest price during the current session
  o: number; // Opening price for the current session
  pc: number; // Previous close price
  v?: number; // Volume of the trade (optional)
  p?: number; // Last traded price
  t: number; // Timestamp in UNIX seconds
}

export interface FinnhubMessage {
  type: string;
  data: Array<{
    s: string; // Symbol (e.g., BTCUSDT)
    p: number; // Last traded price
    v: number; // Volume of the trade
    t: number; // Timestamp in UNIX milliseconds (ms since Jan 1, 1970)
    c: number; // Current price of the asset
    d: number; // Change in price from the previous close
    dp: number; // Percentage change in price
  }>;
}

export interface CoinGeckoCandleData {
  prices: [number, number][]; // [timestamp, price]
}
