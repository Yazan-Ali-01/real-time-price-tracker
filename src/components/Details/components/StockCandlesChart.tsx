import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { useCryptoCandlesQuery } from "../../../hooks/useStockQueries";
import {
  Box,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const CryptoCandlesChart = ({ symbol }: { symbol: string }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const { data, isLoading } = useCryptoCandlesQuery(symbol);

  let chartHeight = 400;
  if (isXs) {
    chartHeight = 200;
  } else if (isSm) {
    chartHeight = 300;
  }

  if (isLoading) {
    return (
      <Box>
        <Typography color="primary.main" variant="h2" gutterBottom>
          {symbol.toUpperCase()} Price Chart
        </Typography>
        <Skeleton
          variant="rectangular"
          sx={{ borderRadius: "10px" }}
          width="100%"
          height={chartHeight}
        />
      </Box>
    );
  }
  if (!data) return null;

  const chartData = data.prices.map(([timestamp, price]) => ({
    time: format(new Date(timestamp), "dd:HH:mm"),
    price: price,
  }));

  return (
    <>
      <Typography color="primary.main" variant="h2" fontSize={isSm ? 20 : 40}>
        {symbol.toUpperCase()} Price Chart {isSm && <br />} (Last 30 Days)
      </Typography>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.5} />
          <XAxis
            dataKey="time"
            tick={{ fill: "#555", fontSize: 12 }}
            tickMargin={10}
          />
          <YAxis
            width={40}
            tick={{ fill: "#555", fontSize: 12 }}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#222",
              borderRadius: 10,
              border: "none",
            }}
            labelStyle={{ color: "#fff" }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="url(#lineGradient)"
            strokeWidth={2}
            dot={false}
            animationDuration={500}
          />
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4CAF50" />
              <stop offset="100%" stopColor="#81C784" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default CryptoCandlesChart;
