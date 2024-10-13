import { useIsFetching } from "@tanstack/react-query";
import { CircularProgress, Box } from "@mui/material";

export const GlobalLoadingIndicator: React.FC = () => {
  const isFetching = useIsFetching();

  const display = isFetching ? "inherit" : "none";

  return (
    <Box
      sx={{
        display,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "4px",
        backgroundColor: "transparent",
        zIndex: 1200,
      }}
    >
      <CircularProgress size={24} sx={{ color: "primary.main", margin: 4 }} />
    </Box>
  );
};
