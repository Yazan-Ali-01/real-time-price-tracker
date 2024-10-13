import { Box, Typography } from "@mui/material";
import React from "react";
import { StockCard } from "./components/StockCard";
import { cryptoInfoMap, cryptoSymbols } from "../../configs/cryptoSymbols";
import Typewriter from "typewriter-effect";

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
      {/* <Typography variant="h1" sx={{ fontSize: { xs: 24, sm: 32, md: 40 } }}>
        Track Real-Time Prices - Crypto Trading
      </Typography> */}
      <Typography
        variant="h1"
        sx={{ fontSize: { xs: 24, sm: 32, md: 40 }, fontWeight: "bold" }}
      >
        <Typewriter
          options={{
            strings: ["Track Real-Time Prices", "Crypto Trading"], // Text to type
            autoStart: true,
            loop: true, // Loop through the strings
            delay: 75, // Delay between typing each character
            deleteSpeed: 50, // Speed of deletion
          }}
        />
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
