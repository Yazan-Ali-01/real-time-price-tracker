export const queryKeys = {
  stock: (symbol: string) => ["stock", symbol],
  forex: (base: string) => ["forex", base],
  commodity: (name: string) => ["commodity", name],
  cryptoCandles: (id: string) => ["cryptoCandles", id],
};
