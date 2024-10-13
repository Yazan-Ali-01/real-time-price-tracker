import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useStockSubscription } from "../../../hooks/useStockSubscription";
import { Link } from "react-router-dom";

interface StockCardProps {
  symbol: string;
  name: string;
  logo: string;
  indicator: string;
}

export const StockCard: React.FC<StockCardProps> = ({
  symbol,
  name,
  logo,
  indicator,
}) => {
  const { data, isLoading } = useStockSubscription(symbol);

  const [prevPrice, setPrevPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState(false);

  useEffect(() => {
    if (data && typeof data.c === "number") {
      const currentPrice = data.c;
      if (prevPrice !== null && currentPrice !== prevPrice) {
        console.log({ currentPrice, prevPrice });
        setPriceChange(true);
        const timeout = setTimeout(() => {
          setPriceChange(false);
        }, 300);
        return () => clearTimeout(timeout);
      }
      setPrevPrice(currentPrice);
    }
  }, [data, prevPrice]);

  if (isLoading) {
    return (
      <Card
        sx={{
          width: {
            xs: "100%",
            sm: "70%",
          },
          borderRadius: 2,
          boxShadow: 3,
          height: { xs: "358px", md: "311px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          bgcolor: "#0f172a",
        }}
      >
        <CircularProgress color="primary" />
      </Card>
    );
  }

  const priceDisplay = data?.c ? data.c.toFixed(2) : "N/A";
  return (
    <Card
      sx={{
        width: {
          xs: "100%",
          sm: "70%",
        },
        transition: "transform 500ms ease-in-out",
        ":hover": {
          scale: 1.02,
        },
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Link
        to={`/details/${symbol}`}
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={logo}
          alt={name}
          sx={{
            bgcolor: "#020617",
            objectFit: "contain",
            width: "100%",
            paddingY: 2,
          }}
        />
        <CardContent
          sx={{
            bgcolor: "#0f172a",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: { xs: 1, sm: 0 },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              {name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "0.9rem", sm: "1rem" },
                transition: "all 300ms ease-in-out",
                transform: priceChange ? "scale(1.05)" : "scale(1)",
                color: priceChange ? "info.main" : "inherit",
              }}
            >
              Price:{" "}
              <span style={{ fontWeight: "bold", fontSize: "1.15rem" }}>
                ${priceDisplay}
              </span>
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
            >
              Change: {data?.d?.toFixed(4) || "N/A"}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
            >
              Percent Change: {data?.dp?.toFixed(9) || "N/A"}%
            </Typography>
            <Typography
              variant="body1"
              color={indicator.startsWith("+") ? "success.main" : "error.main"}
              sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
            >
              Indicator: {indicator} (Dummy)
            </Typography>
          </Box>

          <Link
            to={`/details/${symbol}`}
            style={{ textDecoration: "none", marginTop: 2 }}
          >
            <Button
              sx={{
                transition: "transform 300ms ease-in-out",
                fontSize: { xs: "0.8rem", sm: "1rem" },
                ":hover": {
                  transform: "scale(1.05)",
                },
              }}
              variant="contained"
              color="primary"
            >
              <Typography
                variant="button"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                Check Details
              </Typography>
              <Typography
                variant="button"
                sx={{ display: { xs: "inline", sm: "none" } }}
              >
                Details
              </Typography>
              <NavigateNextIcon />
            </Button>
          </Link>
        </CardContent>
      </Link>
    </Card>
  );
};
