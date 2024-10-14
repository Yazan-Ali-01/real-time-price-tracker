import {
  Box,
  Grid2,
  styled,
  Typography,
  Grid2Props,
  Stack,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { GoBackButton } from "../core/GoBackButton";
import { cryptoInfoMap } from "../../configs/cryptoSymbols";
import { useStockSubscription } from "../../hooks/useStockSubscription";
import { formatDate } from "../../lib/formatDate";
import StockCandlesChart from "./components/StockCandlesChart";
import { mapBinanceSymbolToCoingeckoId } from "../../lib/mapBinanceSymbol";

const StyledGrid = styled(Grid2)<Grid2Props>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  border: "1px solid",
  borderColor: theme.palette.grey[300],
  borderRadius: theme.shape.borderRadius * 2,
  flex: 1,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

const Details = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, isLoading } = useStockSubscription(symbol!);

  if (isLoading) {
    return (
      <Stack direction="column" spacing={4}>
        <Skeleton
          variant="rectangular"
          sx={{ borderRadius: "10px" }}
          width="100%"
          height={173}
        />
        <Skeleton
          variant="rectangular"
          sx={{ borderRadius: "10px" }}
          width="100%"
          height={156}
        />
      </Stack>
    );
  }

  const cryptoInfo = cryptoInfoMap[symbol as keyof typeof cryptoInfoMap];
  if (!cryptoInfo || data === null) {
    return (
      <Box sx={{ marginTop: 5, display: "flex", justifyContent: "center" }}>
        <GoBackButton />
        <Typography variant="h6">Crypto information not found.</Typography>
      </Box>
    );
  }

  const coingeckoId = mapBinanceSymbolToCoingeckoId(symbol!);
  const marketData = [
    { label: "Last Traded Price", value: `$${data?.p?.toFixed(2) || 0}` },
    { label: "Current Price", value: `$${data?.c?.toFixed(2)}` },
    { label: "Trade Volume", value: `${data?.v}` },
    { label: "Price Change", value: `$${data?.d?.toFixed(2)}` },
    { label: "Percentage Change", value: `${data?.dp?.toFixed(9)}%` },
  ];

  return (
    <>
      <GoBackButton />
      <Stack direction="column" spacing={4} sx={{ padding: theme.spacing(2) }}>
        <Box
          sx={{
            border: "1px solid",
            padding: isSm ? 2 : 4,
            borderColor: "primary.main",
            borderRadius: 2,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: isSm ? "column" : "row",
            alignItems: "center",
            justifyContent: isSm ? "center" : "flex-start",
            gap: isSm ? 2 : 0,
            textAlign: isSm ? "center" : "left",
          }}
        >
          <img
            src={cryptoInfo.logo}
            alt={cryptoInfo.name}
            style={{
              width: isSm ? "50px" : "60px",
              height: isSm ? "50px" : "60px",
              marginRight: isSm ? 0 : "20px",
            }}
          />
          <Typography
            variant={isSm ? "h6" : "h5"}
            sx={{ marginRight: isSm ? 0 : 4 }}
          >
            {cryptoInfo.name}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h3" fontSize={isSm ? "2rem" : "3rem"}>
              ${data?.c}
            </Typography>
            <Typography variant="h6" fontSize="1rem" color="grey.400">
              1.00000000 {cryptoInfo.name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: isSm ? 0 : "auto",
              textAlign: isSm ? "center" : "right",
            }}
          >
            <Typography variant="h6">Data Updated On</Typography>
            <Typography variant="body1" fontSize="1rem" color="grey.400">
              {data?.t ? formatDate(data?.t) : 0}
            </Typography>
          </Box>
        </Box>
        <Grid2
          container
          spacing={isSm ? 2 : 3}
          sx={{
            marginTop: 4,
            padding: isSm ? 1 : 2,
            bgcolor: "background.paper",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "primary.main",
            flexDirection: isSm ? "column" : "row",
          }}
        >
          {marketData.map((item, index) => (
            <StyledGrid
              key={index}
              sx={{
                flexDirection: isSm ? "row" : "column",
                justifyContent: isSm ? "space-between" : "center",
                alignItems: "center",
                width: isSm ? "100%" : "auto",
                padding: isSm ? theme.spacing(1) : theme.spacing(2),
              }}
            >
              <Typography
                variant="subtitle1"
                fontSize={isSm ? 10 : 12}
                fontWeight="bold"
                textAlign="center"
              >
                {item.label}
              </Typography>
              <Typography variant="h6" color="primary.main">
                {item.value}
              </Typography>
            </StyledGrid>
          ))}
        </Grid2>

        <StockCandlesChart symbol={coingeckoId} />
      </Stack>
    </>
  );
};

export default Details;
