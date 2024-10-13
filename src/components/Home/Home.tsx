import { Box, Typography } from "@mui/material";
import React from "react";
import { StockCard } from "./components/StockCard";
import { cryptoInfoMap, cryptoSymbols } from "../../configs/cryptoSymbols";

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: { xs: 2, sm: 3, md: "45px" },
        width: "100%",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: { xs: 24, sm: 32, md: 40 } }}>
        Track Real-Time Prices - Crypto Trading
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 2, sm: 3, md: "20px" },
        }}
      >
        {cryptoSymbols.map((symbol) => (
          <StockCard
            key={symbol}
            symbol={symbol}
            name={cryptoInfoMap[symbol].name}
            logo={cryptoInfoMap[symbol].logo}
            indicator={cryptoInfoMap[symbol].indicator}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
